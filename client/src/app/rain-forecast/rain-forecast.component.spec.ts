import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainForecastComponent } from './rain-forecast.component';

describe('RainForecastComponent', () => {
  let component: RainForecastComponent;
  let fixture: ComponentFixture<RainForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RainForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RainForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
