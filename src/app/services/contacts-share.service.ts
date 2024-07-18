import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContactsList, ManagedContactsListItem } from '../../shared/contacts-list';
import { ContactsListItem } from '../../shared/contacts-list-item';
import { Contact } from '../../shared/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsShareService {
  private onContactsSubject = new Subject<ContactsList>();

  private currentContacts = new ContactsList();

  nextContacts(contacts: ContactsList) {
    this.currentContacts = contacts;
    this.onContactsSubject.next(contacts);
  }

  onContacts(callback: (contacts: ContactsList) => void) {
    return this.onContactsSubject.subscribe(callback);
  }

  getCurrentContacts() {
    return this.currentContacts;
  }

  addContact(contact: ContactsListItem) {
    this.currentContacts.contacts.push(new ManagedContactsListItem(contact));
    this.nextContacts(this.currentContacts);
  }

  removeByIds(ids: number[]) {
    this.currentContacts.contacts = this.currentContacts.contacts.filter(
      (contact) => !ids.includes(contact.id)
    );
    this.nextContacts(this.currentContacts);
  }

  replaceContact(contact: Contact) {
    const replaceLocation = this.currentContacts.contacts.findIndex(contact => contact.id === contact.id);
    this.currentContacts.contacts.splice(
      replaceLocation,
      1,
      new ManagedContactsListItem(contact)
    );
    this.nextContacts(this.currentContacts);
  }

}
