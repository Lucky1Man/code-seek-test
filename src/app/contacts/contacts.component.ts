import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsFilterComponent } from '../contacts-filter/contacts-filter.component';
import { ContactsListComponent } from '../contacts-list/contacts-list.component';
import { ContactsShareService } from '../services/contacts-share.service';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactsListComponent, ContactsFilterComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private contactsShareService: ContactsShareService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initContacts();
  }

  async initContacts() {
    this.contactsService.fetchContacts();
  }

  openCreateContactPage() {
    this.router.navigateByUrl('/addContact');
  }

  deleteSelectedContacts() {
    const contacts = this.contactsShareService.getCurrentFilteredContacts();
    if (contacts === undefined) {
      return;
    }
    const toBeDeleted = contacts.contacts
      .filter((contact) => contact.isMarkedForDeletion)
      .map((contact) => contact.id);
    this.contactsService.deleteByIds(toBeDeleted);
  }
}
