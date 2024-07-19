import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ManagedContactListItem } from '../../shared/contacts-list';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-contacts-list-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './contacts-list-item.component.html',
  styleUrl: './contacts-list-item.component.scss',
})
export class ContactsListItemComponent {
  @Input() contactItem = new ManagedContactListItem();

  constructor(private router: Router) {}

  toggleIsMarkedForDeletion() {
    this.contactItem.isMarkedForDeletion =
      !this.contactItem.isMarkedForDeletion;
  }

  goToEditContactPage() {
    this.router.navigate(['/editContact', this.contactItem.id]);
  }

  goToContactDetailsPage() {
    this.router.navigate(['/viewDetails', this.contactItem.id]);
  }
}
