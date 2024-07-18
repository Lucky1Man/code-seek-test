import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { CreateContactDto } from '../../shared/create-contact-dto';
import { getMeaningfulMessage } from '../../shared/input-fields-utils';
import { ContactsService } from '../services/contacts.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

type ContactForm = {
  nameField: FormControl;
  surnameField: FormControl;
  phoneNumberField: FormControl;
  birthDateField: FormControl;
  emailField: FormControl;
  addressField: FormControl;
};

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent {
  private readonly phoneNumberRegex = /^\+\d{12}$/;

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  contactForm = new FormGroup({
    nameField: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    surnameField: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    phoneNumberField: new FormControl('', [
      Validators.required,
      Validators.pattern(this.phoneNumberRegex),
    ]),
    birthDateField: new FormControl('', [Validators.required]),
    emailField: new FormControl('', [Validators.required, Validators.email]),
    addressField: new FormControl('', [Validators.required]),
  });

  fields = this.contactForm.controls;

  invalid(field: FormControl) {
    return field.touched && field.invalid;
  }

  getMessage(field: FormControl) {
    return getMeaningfulMessage(field);
  }

  createContact() {
    const {
      nameField,
      surnameField,
      phoneNumberField,
      birthDateField,
      emailField,
      addressField,
    } = this.fields;
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.contactsService
      .saveContact(
        new CreateContactDto({
          name: nameField.value ?? undefined,
          surname: surnameField.value ?? undefined,
          phoneNumber: phoneNumberField.value ?? undefined,
          birthDate: birthDateField.value ?? undefined,
          email: emailField.value ?? undefined,
          address: addressField.value ?? undefined,
        })
      )
      .then(() => this.router.navigate(['/']));
  }
}
