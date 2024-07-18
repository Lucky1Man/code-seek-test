import { TestBed } from '@angular/core/testing';

import { ContactsShareService } from './contacts-share.service';

describe('ContactsShareService', () => {
  let service: ContactsShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
