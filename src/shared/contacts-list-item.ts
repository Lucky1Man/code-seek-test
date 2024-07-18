export class ContactsListItem {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;

  constructor({
    id = 0,
    name = 'name placeholder',
    surname = 'surname placeholder',
    phoneNumber = 'phone placeholder',
  } = {}) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
  }
}
