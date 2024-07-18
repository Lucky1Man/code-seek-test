import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../shared/contact';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit {
  contactId: number;
  contact = new Contact();

  constructor(
    private contactService: ContactsService,
    private router: Router,
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
      .then((contact) => {
        if (contact === undefined) {
          throw new Error(
            'Error on contact`s details page. Contact not specified or not found!'
          );
        }
        this.contact = contact;
      });
  }

  goToEditPage() {
    this.router.navigate(['/editContact', this.contact.id]);
  }

  goToPreviousPage() {
    this.location.back();
  }

}
