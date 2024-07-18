export class CreateContactDto {
  name: string;
  surname: string;
  phoneNumber: string;
  birthDate: Date;
  email: string;
  address: string;

  constructor({
    name = 'name placeholder',
    surname = 'surname placeholder',
    phoneNumber = 'phone placeholder',
    birthDate = '01.01.2000',
    email = 'placeholder@gmail.com',
    address = 'address placeholder',
  } = {}) {
    this.name = name;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.birthDate = new Date(birthDate);
    this.email = email;
    this.address = address;
  }
}
