import { Component, OnInit } from '@angular/core';
import { ContactsListComponent } from '../contacts-list/contacts-list.component';
import { ContactsShareService } from '../services/contacts-share.service';
import { ContactsService } from '../services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactsListComponent],
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
    const toBeDeleted = this.contactsShareService
      .getCurrentContacts()
      .contacts.filter((contact) => contact.isMarkedForDeletion)
      .map((contact) => contact.id);
    this.contactsService.deleteByIds(toBeDeleted);
  }
}
