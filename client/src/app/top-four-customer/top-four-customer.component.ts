import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopFourCustomer } from "../models/top-four-customer.model";

import { TopFourCustomerService } from "./top-four-customer.service"
@Component({
  selector: 'app-top-four-customer',
  templateUrl: './top-four-customer.component.html',
  styleUrls: ['./top-four-customer.component.scss']
})
export class TopFourCustomerComponent implements OnInit,OnChanges {

  @Input() refreshForecastToggle : boolean = false;

  public Total=0;
  public MaxHeight= 130;
  public TopFourCustomers:Array<TopFourCustomer>=[];
  constructor(private topFourCustomerService:TopFourCustomerService) { }

  ngOnInit(): void {
    this.TopFourCustomers = this.topFourCustomerService.getTopFourCustomerForecastFromStorage();
    if(!this.TopFourCustomers || this.TopFourCustomers.length === 0 ){
      this.topFourCustomerService.getTopFourCustomerForecast().subscribe(
        data=>{
          console.log("Top Four Customer Forecast API Call Response-->",data)
          if(data.status==='SUCCESS'){
            for(let forecast of data.data){
              forecast.numberOfEmployees=parseInt(forecast.numberOfEmployees)
              this.TopFourCustomers.push({
                size:'',
                color:(forecast.rainForecast) ? "#00ff00":"#ff0000",
                ...forecast
              })
            }
            this.topFourCustomerService.setTopFourCustomerForecast(this.TopFourCustomers)
            this.showBarGraph();
          }
        }
      )
    }else{
      this.showBarGraph();
    }
  }

  ngOnChanges(changes:SimpleChanges){
    if(!changes.refreshForecastToggle.firstChange && (changes.refreshForecastToggle.previousValue !== changes.refreshForecastToggle.currentValue)){
      this.refreshForecast()
    }
  }

  showBarGraph(){
    this.TopFourCustomers.forEach(element => {
      this.Total += element.numberOfEmployees;
    });

    this.TopFourCustomers.forEach(element => {
      element.size = Math.round((element.numberOfEmployees*this.MaxHeight)/this.Total) + '%';
    });
  }

  refreshForecast(){
    localStorage.removeItem('topFourCustomerForecast')
    this.Total=0;
    this.TopFourCustomers=[]
    this.topFourCustomerService.getTopFourCustomerForecast().subscribe(
      data=>{
        console.log("Top Four Customer Forecast API Call Response-->",data)
        if(data.status==='SUCCESS'){
          for(let forecast of data.data){
            forecast.numberOfEmployees=parseInt(forecast.numberOfEmployees)
            this.TopFourCustomers.push({
              size:'',
              color:(forecast.rainForecast) ? "#00ff00":"#ff0000",
              ...forecast
            })
          }
          this.topFourCustomerService.setTopFourCustomerForecast(this.TopFourCustomers)
          this.showBarGraph();
        }
      }
    )
  }
}
