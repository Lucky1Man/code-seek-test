import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { ContactsShareService } from './services/contacts-share.service';
import { ContactsService } from './services/contacts.service';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ContactsService,
    ContactsShareService,
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
  ],
};
