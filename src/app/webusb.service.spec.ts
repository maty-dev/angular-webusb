import { TestBed } from '@angular/core/testing';

import { UsbService } from './webusb.service';

describe('WebusbService', () => {
  let service: UsbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
