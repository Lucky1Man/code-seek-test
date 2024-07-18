import { Injectable, OnDestroy } from '@angular/core';
import { Contact } from '../../shared/contact';
import { ContactsList } from '../../shared/contacts-list';
import { ContactsListItem } from '../../shared/contacts-list-item';
import { CreateContactDto } from '../../shared/create-contact-dto';
import { UpdateContactDto } from '../../shared/update-contact-dto';
import { ContactsShareService } from './contacts-share.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService implements OnDestroy {
  private static readonly CONTACTS_KEY = 'contacts';
  private static readonly CURRENT_INDEX_VALUE_KEY = 'index-value';

  private static contactsIdCounter = 0;

  constructor(private contactsShareService: ContactsShareService) {
    ContactsService.contactsIdCounter = Number.parseInt(
      localStorage.getItem(ContactsService.CURRENT_INDEX_VALUE_KEY) ?? '0'
    );
  }

  ngOnDestroy(): void {
    console.log('ContactsService destroyed')
  }

  async fetchContacts(): Promise<ContactsList> {
    const contacts: ContactsList = this.getContactsListFromLocalStorage();
    this.contactsShareService.nextContacts(contacts);
    return Promise.resolve(contacts);
  }

  private getContactsListFromLocalStorage() {
    return new ContactsList({
      contacts: this.getContactsFromLocalStorage().map(
        (contact) => new ContactsListItem(contact)
      ),
    });
  }

  private getContactsFromLocalStorage() {
    const newLocal = JSON.parse(
      localStorage.getItem(ContactsService.CONTACTS_KEY) ?? '[]'
    ) as Contact[];
    const newLocal_1 = newLocal.map((contact) => new Contact(contact));
    return newLocal_1;
  }

  async saveContact(contact: CreateContactDto): Promise<number> {
    ContactsService.contactsIdCounter++;
    localStorage.setItem(
      ContactsService.CURRENT_INDEX_VALUE_KEY,
      ContactsService.contactsIdCounter.toString()
    );
    this.contactsShareService.addContact(
      new ContactsListItem(this.saveDetailedContactInLocalStorage(contact))
    );
    return Promise.resolve(ContactsService.contactsIdCounter);
  }

  private saveDetailedContactInLocalStorage(
    contact: CreateContactDto
  ): Contact {
    const detailedContacts = this.getContactsFromLocalStorage();
    const detailedContact = new Contact({
      ...contact,
      id: ContactsService.contactsIdCounter,
    });
    detailedContacts.push(detailedContact);
    this.replaceContactsInLocalStorage(detailedContacts);
    return detailedContact;
  }

  private replaceContactsInLocalStorage(contacts: Contact[]) {
    localStorage.setItem(
      ContactsService.CONTACTS_KEY,
      JSON.stringify(contacts)
    );
  }

  async deleteByIds(ids: number[]): Promise<void> {
    this.deleteContactsInLocalStorage(ids);
    this.contactsShareService.removeByIds(ids);
    return Promise.resolve();
  }

  private deleteContactsInLocalStorage(ids: number[]) {
    const detailedContacts = this.getContactsFromLocalStorage();
    this.replaceContactsInLocalStorage(
      detailedContacts.filter((contact) => !ids.includes(contact.id))
    );
  }

  async getDetailedContactById(id: number): Promise<Contact | undefined> {
    return Promise.resolve(
      this.getContactsFromLocalStorage().find((contact) => contact.id === id)
    );
  }

  async updateContact(updateContactDto: UpdateContactDto) {
    if (!updateContactDto.hasNewValues()) {
      return Promise.resolve();
    }
    const contacts = this.getContactsFromLocalStorage();
    const editedContactLocation = contacts.findIndex(
      (contact) => contact.id === updateContactDto.oldContact.id
    );
    const updatedContact = new Contact(updateContactDto);
    contacts.splice(editedContactLocation, 1, updatedContact);
    this.replaceContactsInLocalStorage(contacts);
    this.contactsShareService.replaceContact(updatedContact);
  }
}
