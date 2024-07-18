import { ContactsListItem } from './contacts-list-item';

export class ManagedContactListItem extends ContactsListItem {
  isMarkedForDeletion = false;
  constructor(data: Partial<ManagedContactListItem> = {}) {
    super(data);
  }
}

export class ContactsList {
  contacts: ManagedContactListItem[];
  totalAmount: number;

  constructor({
    contacts = new Array<ContactsListItem>(),
    totalAmount = contacts.length,
  }: {
    contacts?: ContactsListItem[];
    totalAmount?: number;
  } = {}) {
    this.contacts = contacts.map((val) => new ManagedContactListItem(val));
    this.totalAmount = totalAmount;
  }
  
}

export type ManagedContactFilter = (contact: ManagedContactListItem) => boolean;
