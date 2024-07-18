import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../shared/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { UpdateContactDto } from '../../shared/update-contact-dto';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { getMeaningfulMessage } from '../../shared/input-fields-utils';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

type UpdateContactFormType = {
  nameField: FormControl<string | null>;
  surnameField: FormControl<string | null>;
  phoneNumberField: FormControl<string | null>;
  birthDateField: FormControl<Date | null>;
  emailField: FormControl<string | null>;
  addressField: FormControl<string | null>;
};

@Component({
  selector: 'app-update-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.scss',
})
export class UpdateContactComponent implements OnInit {
  private readonly phoneNumberRegex = /^\+\d{12}$/;

  updateContactForm = new FormGroup<UpdateContactFormType>({
    nameField: new FormControl(''),
    surnameField: new FormControl(''),
    phoneNumberField: new FormControl(''),
    birthDateField: new FormControl(new Date()),
    emailField: new FormControl(''),
    addressField: new FormControl(''),
  });
  contactId: number;
  oldContact = new Contact();
  fields = this.updateContactForm.controls;

  constructor(
    private contactService: ContactsService,
    private location: Location,
    activatedRoute: ActivatedRoute
  ) {
    this.contactId = Number.parseInt(
      activatedRoute.snapshot.paramMap.get('contactId')!!
    );
  }
  ngOnInit(): void {
    this.contactService
      .getDetailedContactById(this.contactId)
      .then((oldContact) => {
        if (oldContact === undefined) {
          throw new Error(
            'Error on edit contact page. Old contact not specified or not found!'
          );
        }
        this.oldContact = oldContact;
        this.updateContactForm = new FormGroup({
          nameField: new FormControl(oldContact.name, [
            Validators.required,
            Validators.minLength(2),
          ]),
          surnameField: new FormControl(oldContact.surname, [
            Validators.required,
            Validators.minLength(2),
          ]),
          phoneNumberField: new FormControl(oldContact.phoneNumber, [
            Validators.required,
            Validators.pattern(this.phoneNumberRegex),
          ]),
          birthDateField: new FormControl(oldContact.birthDate, [
            Validators.required,
          ]),
          emailField: new FormControl(oldContact.email, [
            Validators.required,
            Validators.email,
          ]),
          addressField: new FormControl(oldContact.address, [
            Validators.required,
          ]),
        });
        this.fields = this.updateContactForm.controls;
      });
  }

  invalid(field: FormControl) {
    return field.touched && field.invalid;
  }

  getMessage(field: FormControl) {
    return getMeaningfulMessage(field);
  }

  updateContact() {
    const {
      nameField,
      surnameField,
      phoneNumberField,
      birthDateField,
      emailField,
      addressField,
    } = this.updateContactForm.controls;
    if (this.updateContactForm.invalid) {
      this.updateContactForm.markAllAsTouched();
      return;
    }
    this.contactService
      .updateContact(
        new UpdateContactDto({
          oldContact: this.oldContact,
          name:
            nameField.value !== null && nameField.value !== this.oldContact.name
              ? nameField.value
              : undefined,
          surname:
            surnameField.value !== null &&
            surnameField.value !== this.oldContact.surname
              ? surnameField.value
              : undefined,
          phoneNumber:
            phoneNumberField.value !== null &&
            phoneNumberField.value !== this.oldContact.phoneNumber
              ? phoneNumberField.value
              : undefined,
          birthDate:
            birthDateField.value !== null &&
            birthDateField.value !== this.oldContact.birthDate
              ? birthDateField.value.toLocaleDateString()
              : undefined,
          email:
            emailField.value !== null &&
            emailField.value !== this.oldContact.email
              ? emailField.value
              : undefined,
          address:
            addressField.value !== null &&
            addressField.value !== this.oldContact.address
              ? addressField.value
              : undefined,
        })
      )
      .then(() => this.location.back());
  }

  goToPreviousPage() {
    this.location.back();
  }

}
