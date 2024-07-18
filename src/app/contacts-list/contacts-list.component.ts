import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactsList, ManagedContactListItem } from '../../shared/contacts-list';
import { ContactsListItemComponent } from '../contacts-list-item/contacts-list-item.component';
import { ContactsShareService } from '../services/contacts-share.service';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [ContactsListItemComponent, CommonModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
})
export class ContactsListComponent implements OnDestroy {
  private subscriptions = new Array<Subscription>();

  contacts: ContactsList;

  constructor(
    contactsShareService: ContactsShareService
  ) {
    this.contacts = contactsShareService.getCurrentFilteredContacts() ?? new ContactsList();
    this.subscriptions.push(
      contactsShareService.onFilteredContacts((contacts) => (this.contacts = contacts))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  trackById(index: number, item: ManagedContactListItem): number {
    return item.id;
  }
}
