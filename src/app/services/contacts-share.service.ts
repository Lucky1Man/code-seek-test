import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  ContactsList,
  ManagedContactFilter,
  ManagedContactListItem,
} from '../../shared/contacts-list';
import { ContactsListItem } from '../../shared/contacts-list-item';
import { Contact } from '../../shared/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsShareService {
  private onContactsSubject = new Subject<ContactsList>();
  private onFilteredContactsSubject = new Subject<ContactsList>();

  private currentContacts = new ContactsList();

  private currentFilteredContacts?: ContactsList;
  private currentContactsFilters: ManagedContactFilter[] = [() => true];

  nextContacts(contacts: ContactsList) {
    this.currentContacts = contacts;
    if (this.currentFilteredContacts === undefined || this.currentFilteredContacts.contacts.length === 0) {
      this.nextContactsFilters(this.currentContactsFilters);
    }
    this.onContactsSubject.next(contacts);
  }

  onContacts(callback: (contacts: ContactsList) => void) {
    return this.onContactsSubject.subscribe(callback);
  }

  nextContactsFilters(filters: ManagedContactFilter[]) {
    this.currentFilteredContacts = new ContactsList({
      contacts: this.currentContacts.contacts.filter((contact) =>
        filters.some((filter) => filter(contact))
      ),
    });
    this.onFilteredContactsSubject.next(this.currentFilteredContacts);
    this.currentContactsFilters = filters;
  }

  onFilteredContacts(callback: (contacts: ContactsList) => void) {
    return this.onFilteredContactsSubject.subscribe(callback);
  }

  getCurrentContacts() {
    return this.currentContacts;
  }

  getCurrentFilteredContacts() {
    return this.currentFilteredContacts;
  }

  addContact(contact: ContactsListItem) {
    this.currentContacts.contacts.push(new ManagedContactListItem(contact));
    this.nextContacts(this.currentContacts);
  }

  removeByIds(ids: number[]) {
    this.currentContacts.contacts = this.currentContacts.contacts.filter(
      (contact) => !ids.includes(contact.id)
    );
    this.nextContacts(this.currentContacts);
    if(this.currentFilteredContacts !== undefined) {
      this.currentFilteredContacts.contacts = this.currentFilteredContacts.contacts.filter(
        (contact) => !ids.includes(contact.id)
      );
      this.onFilteredContactsSubject.next(this.currentFilteredContacts);
    }
  }

  replaceContact(contact: Contact) {
    const replaceLocation = this.currentContacts.contacts.findIndex(
      (contact) => contact.id === contact.id
    );
    this.currentContacts.contacts.splice(
      replaceLocation,
      1,
      new ManagedContactListItem(contact)
    );
    this.nextContacts(this.currentContacts);
  }
}
