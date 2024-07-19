import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactsService } from './services/contacts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(contactsService: ContactsService) {
    contactsService.fetchContacts().then((contacts) => {
      if (contacts.contacts.length === 0) {
        contactsService.saveContact({
          name: 'Orest',
          surname: 'Tsiatsiak',
          phoneNumber: '+380666666666',
          birthDate: new Date(2004, 10, 18),
          email: 'email@gmail.com',
          address: 'address here',
        });
        contactsService.saveContact({
          name: 'Nazar',
          surname: 'Khmelnuk',
          phoneNumber: '+380555555555',
          birthDate: new Date(2006, 10, 18),
          email: 'email@gmail.com',
          address: 'address here',
        });
        contactsService.saveContact({
          name: 'Nastya',
          surname: 'Surname',
          phoneNumber: '+380333333333',
          birthDate: new Date(2009, 10, 18),
          email: 'email@gmail.com',
          address: 'address here',
        });
        contactsService.saveContact({
          name: 'Dmutro',
          surname: 'Tsiatsiak',
          phoneNumber: '+380222222222',
          birthDate: new Date(2010, 10, 18),
          email: 'email@gmail.com',
          address: 'address here',
        });
      }
    });
  }
}
