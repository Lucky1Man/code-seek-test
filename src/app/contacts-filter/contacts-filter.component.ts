import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ContactsList,
  ManagedContactFilter,
  ManagedContactListItem,
} from '../../shared/contacts-list';
import { ContactsShareService } from '../services/contacts-share.service';
import { map, Observable, startWith, Subscription } from 'rxjs';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncPipe, Location } from '@angular/common';

@Component({
  selector: 'app-contacts-filter',
  standalone: true,
  imports: [MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './contacts-filter.component.html',
  styleUrl: './contacts-filter.component.scss',
})
export class ContactsFilterComponent implements OnInit, OnDestroy {
  private static readonly NAME_FILTER = 'name';

  private subscriptions = new Array<Subscription>();
  contactNameField = new FormControl('');
  nameOptions: string[];
  filteredOptions = new Observable<string[]>();
  activeFilters: ManagedContactFilter[];

  constructor(
    private contactsShareService: ContactsShareService,
    private location: Location,
    activatedRoute: ActivatedRoute
  ) {
    this.activeFilters = this.buildFilterFromQueryParams(
      activatedRoute.snapshot.queryParamMap
    );
    contactsShareService.nextContactsFilters(this.activeFilters);
    this.nameOptions = this.getContactNames(
      contactsShareService.getCurrentContacts()
    );
    this.subscriptions.push(
      contactsShareService.onContacts(
        (contacts) => (this.nameOptions = this.getContactNames(contacts))
      )
    );
  }

  private buildFilterFromQueryParams(
    queryParamMap: ParamMap
  ): ManagedContactFilter[] {
    const filters = new Array<ManagedContactFilter>();
    const name = queryParamMap.get(ContactsFilterComponent.NAME_FILTER);
    if (name !== null) {
      filters.push((contact) => contact.name === name);
      this.contactNameField.setValue(name);
    }
    if (filters.length === 0) {
      filters.push(() => true);
    }
    return filters;
  }

  ngOnInit(): void {
    this.filteredOptions = this.contactNameField.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || ''))
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nameOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private getContactNames(contactsList: ContactsList) {
    return contactsList.contacts.map((contact) => contact.name);
  }

  updateFilter() {
    this.location.replaceState(
      this.location.path(),
      `${ContactsFilterComponent.NAME_FILTER}=${this.contactNameField.value}`
    );
    this.activeFilters = [this.byNameFilter(this.contactNameField.value)];
    this.contactsShareService.nextContactsFilters(this.activeFilters);
  }

  private byNameFilter(name: string | null): ManagedContactFilter {
    return (contact) => contact.name === name;
  }

  clearFilter() {
    this.location.replaceState(this.location.path().split('?').at(0) ?? '');
    this.activeFilters = [() => true];
    this.contactsShareService.nextContactsFilters(this.activeFilters);
    this.contactNameField.setValue('');
  }
}
