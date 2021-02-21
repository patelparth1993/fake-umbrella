import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFourCustomerComponent } from './top-four-customer.component';

describe('TopFourCustomerComponent', () => {
  let component: TopFourCustomerComponent;
  let fixture: ComponentFixture<TopFourCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopFourCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFourCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
