import { TestBed } from '@angular/core/testing';

import { TopFourCustomerService } from './top-four-customer.service';

describe('TopFourCustomerService', () => {
  let service: TopFourCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopFourCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
