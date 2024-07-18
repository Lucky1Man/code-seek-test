import { ContactsListItem } from './contacts-list-item';

export class ManagedContactsListItem extends ContactsListItem {
  isMarkedForDeletion = false;
  constructor(data: Partial<ManagedContactsListItem> = {}) {
    super(data);
  }
}

export class ContactsList {
  contacts: ManagedContactsListItem[];
  totalAmount: number;

  constructor({
    contacts = new Array<ContactsListItem>(),
    totalAmount = contacts.length,
  }: {
    contacts?: ContactsListItem[];
    totalAmount?: number;
  } = {}) {
    this.contacts = contacts.map((val) => new ManagedContactsListItem(val));
    this.totalAmount = totalAmount;
  }
  
}
