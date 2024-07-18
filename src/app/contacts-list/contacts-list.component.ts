import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactsList, ManagedContactsListItem } from '../../shared/contacts-list';
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

  contacts = new ContactsList();

  constructor(
    contactsShareService: ContactsShareService
  ) {
    this.subscriptions.push(
      contactsShareService.onContacts((contacts) => (this.contacts = contacts))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  trackById(index: number, item: ManagedContactsListItem): number {
    return item.id;
  }
}
