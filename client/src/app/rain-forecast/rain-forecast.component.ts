import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RainForecastService } from "./rain-forecast.service"
import { RainForecast } from "../models/rain-forecast.model"
import { Customer } from '../models/customer.model';
import { CustomerService } from '../customer/customer.service';
@Component({
  selector: 'app-rain-forecast',
  templateUrl: './rain-forecast.component.html',
  styleUrls: ['./rain-forecast.component.scss']
})
export class RainForecastComponent implements OnInit, OnChanges {

  constructor(private rainForecastService:RainForecastService, private customerService:CustomerService) { }
  @Input() refreshForecastToggle : boolean = false;
  
  rainForecast:Array<RainForecast> = []
  allCustomers:Array<Customer> = []
  ngOnInit(): void {
    this.allCustomers = this.customerService.getAllCustomersFromStorage()
    this.rainForecast = this.rainForecastService.getRainForecastFromStorage()
    if(!this.rainForecast || this.rainForecast.length === 0 ){
      this.rainForecastService.getRainForecast().subscribe(
        data=>{
          console.log("Rain Forecast API Call Response-->",data)
          if(data.status==='SUCCESS'){
            for(let customer of this.allCustomers){
              for(let rainForecast of data.data){
                if(rainForecast.city===customer.location && rainForecast.rainTime.length>0){
                  this.rainForecast.push({
                    name:customer.name,
                    personOfContact:customer.personOfContact,
                    telephoneNumber:customer.telephoneNumber,
                    city:customer.location,
                    rainTime:rainForecast.rainTime
                  })
                }
              }
            }
            this.rainForecastService.setRainForecast(this.rainForecast)
          }
        }
      )
    }
  }

  ngOnChanges(changes:SimpleChanges){
    if(!changes.refreshForecastToggle.firstChange && (changes.refreshForecastToggle.previousValue !== changes.refreshForecastToggle.currentValue)){
      this.refreshForecast()
    }
  }

  refreshForecast(){
    localStorage.removeItem('rainforecast')
    this.rainForecast=[]
    this.rainForecastService.getRainForecast().subscribe(
      data=>{
        console.log("Rain Forecast API Call Response-->",data)
        if(data.status==='SUCCESS'){
          for(let customer of this.allCustomers){
            for(let rainForecast of data.data){
              if(rainForecast.city===customer.location && rainForecast.rainTime.length>0){
                this.rainForecast.push({
                  name:customer.name,
                  personOfContact:customer.personOfContact,
                  telephoneNumber:customer.telephoneNumber,
                  city:customer.location,
                  rainTime:rainForecast.rainTime
                })
              }
            }
          }
          this.rainForecastService.setRainForecast(this.rainForecast)
        }
      }
    )
  }

}
