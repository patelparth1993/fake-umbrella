import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from '@angular/router'
import { HttpClientModule} from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from "./customer/customer.component"
import { MaterialModule } from "./material.module"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RainForecastComponent } from './rain-forecast/rain-forecast.component';
import { TopFourCustomerComponent } from './top-four-customer/top-four-customer.component';

@NgModule({
  declarations: [
    AppComponent, CustomerComponent, RainForecastComponent, TopFourCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  exports:[CustomerComponent],
  bootstrap: [AppComponent, CustomerComponent]
})
export class AppModule { }
