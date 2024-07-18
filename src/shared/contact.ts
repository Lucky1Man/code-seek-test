import { CreateContactDto } from './create-contact-dto';
import { UpdateContactDto } from './update-contact-dto';

export class Contact {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  birthDate: Date;
  email: string;
  address: string;

  constructor(
    data: Partial<Contact> | CreateContactDto | UpdateContactDto = {}
  ) {
    if (data instanceof CreateContactDto) {
      this.id = 0;
      this.name = data.name;
      this.surname = data.surname;
      this.phoneNumber = data.phoneNumber;
      this.birthDate = data.birthDate;
      this.email = data.email;
      this.address = data.address;
    } else if (data instanceof UpdateContactDto) {
      this.id = data.oldContact.id;
      this.name = data.name === undefined ? data.oldContact.name : data.name;
      this.surname =
        data.surname === undefined ? data.oldContact.surname : data.surname;
      this.phoneNumber =
        data.phoneNumber === undefined
          ? data.oldContact.phoneNumber
          : data.phoneNumber;
      this.birthDate =
        data.birthDate === undefined
          ? data.oldContact.birthDate
          : data.birthDate;
      this.email =
        data.email === undefined ? data.oldContact.email : data.email;
      this.address =
        data.address === undefined ? data.oldContact.address : data.address;
    } else {
      const {
        id = 0,
        name = 'name placeholder',
        surname = 'surname placeholder',
        phoneNumber = 'phone placeholder',
        birthDate = '2000-01-01T00:00:00.000Z',
        email = 'placeholder@gmail.com',
        address = 'address placeholder',
      } = data;
      this.id = id;
      this.name = name;
      this.surname = surname;
      this.phoneNumber = phoneNumber;
      this.birthDate = new Date(birthDate);
      this.email = email;
      this.address = address;
    }
  }
}
