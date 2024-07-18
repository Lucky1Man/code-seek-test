import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';

export const routes: Routes = [
    {
        path: '',
        component: ContactsComponent
    },
    {
        path: 'addContact',
        component: AddContactComponent
    },
    {
        path: 'editContact/:contactId',
        component: UpdateContactComponent
    },
];
