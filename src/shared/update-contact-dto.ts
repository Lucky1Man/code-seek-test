import { Contact } from "./contact";

export class UpdateContactDto {
  oldContact: Contact;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  birthDate?: Date;
  email?: string;
  address?: string;
  
  constructor({
    oldContact,
    name,
    surname,
    phoneNumber,
    birthDate,
    email,
    address,
  }: {
    oldContact: Contact;
    name?: string;
    surname?: string;
    phoneNumber?: string;
    birthDate?: string;
    email?: string;
    address?: string;
  }) {
    this.oldContact = oldContact;
    this.name = name;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate === undefined ? undefined : new Date(birthDate);
    this.email = email;
    this.address = address;
  }

  hasNewValues() {
    return (
      this.name != undefined ||
      this.surname != undefined ||
      this.phoneNumber != undefined ||
      this.birthDate != undefined ||
      this.email != undefined ||
      this.address != undefined
    );
  }
}
