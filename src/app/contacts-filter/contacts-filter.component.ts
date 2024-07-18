import { Component, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ContactsList,
  ManagedContactFilter,
  ManagedContactListItem,
} from '../../shared/contacts-list';
import { ContactsShareService } from '../services/contacts-share.service';
import { Observable, Subscription } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-contacts-filter',
  standalone: true,
  imports: [MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './contacts-filter.component.html',
  styleUrl: './contacts-filter.component.scss',
})
export class ContactsFilterComponent implements OnDestroy {
  private subscriptions = new Array<Subscription>();
  contactNameField = new FormControl('');
  nameOptions: string[];
  activeFilters: ManagedContactFilter[]

  constructor(private contactsShareService: ContactsShareService) {
    this.activeFilters = contactsShareService.getCurrentContactsFilters();
    this.nameOptions = this.getContactNames(
      contactsShareService.getCurrentContacts()
    );
    this.subscriptions.push(
      contactsShareService.onContacts(
        (contacts) => (this.nameOptions = this.getContactNames(contacts))
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private getContactNames(contactsList: ContactsList) {
    return contactsList.contacts.map((contact) => contact.name);
  }

  updateFilter() {
    this.activeFilters = [this.byNameFilter(this.contactNameField.value)];
    this.contactsShareService.nextContactsFilters(this.activeFilters);
  }

  private byNameFilter(name: string | null): ManagedContactFilter {
    return (contact) => contact.name === name;
  }

  clearFilter() {
    this.activeFilters = [() => true];
    this.contactsShareService.nextContactsFilters(this.activeFilters);
    this.contactNameField.setValue('');
  }
}
