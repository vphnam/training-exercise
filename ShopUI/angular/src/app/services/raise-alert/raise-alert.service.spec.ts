import { TestBed } from '@angular/core/testing';

import { RaiseAlertService } from './raise-alert.service';

describe('RaiseAlertService', () => {
  let service: RaiseAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaiseAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
