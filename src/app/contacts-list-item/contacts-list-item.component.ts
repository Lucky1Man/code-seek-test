import { Component, Input, OnInit } from '@angular/core';
import { ContactsListItem } from '../../shared/contacts-list-item';
import { CommonModule } from '@angular/common';
import { ManagedContactsListItem } from '../../shared/contacts-list';
import { ContactsShareService } from '../services/contacts-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts-list-item.component.html',
  styleUrl: './contacts-list-item.component.scss',
})
export class ContactsListItemComponent {
  @Input() contactItem = new ManagedContactsListItem();

  constructor(private router: Router) {}

  toggleIsMarkedForDeletion() {
    this.contactItem.isMarkedForDeletion =
      !this.contactItem.isMarkedForDeletion;
  }

  goToEditContactPage() {
    this.router.navigate(['/editContact', this.contactItem.id])
  }

}
