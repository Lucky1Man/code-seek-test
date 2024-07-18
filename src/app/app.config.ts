import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ContactsService } from './services/contacts.service';
import { ContactsShareService } from './services/contacts-share.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ContactsService, ContactsShareService],
};
