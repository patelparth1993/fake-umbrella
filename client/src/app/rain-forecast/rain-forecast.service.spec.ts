import { TestBed } from '@angular/core/testing';

import { RainForecastService } from './rain-forecast.service';

describe('RainForecastService', () => {
  let service: RainForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RainForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
