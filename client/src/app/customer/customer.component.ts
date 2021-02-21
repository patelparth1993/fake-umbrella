import { Component, OnChanges, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { Customer } from "../models/customer.model"
import { CustomerService } from "./customer.service"
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnChanges{
    constructor(private customerFormBuilder:FormBuilder, private customerService: CustomerService){
    }
    @Input() refreshForecastToggle : boolean = false;

    errorMsg:string = "";
    successMsg:string = "";
    allCustomers: Array<Customer> =[]
    createCustomerForm=this.customerFormBuilder.group({
        name:['',Validators.required],
        personOfContact:['',Validators.required],
        telephoneNumber:['',Validators.required],
        numberOfEmployees:['',Validators.required],
        location:['',Validators.required]
    })

    updateCustomerForm=this.customerFormBuilder.group({
      id:['',Validators.required],
      personOfContact:[''],
      telephoneNumber:[''],
      numberOfEmployees:[''],
      location:['']
    })

    deleteCustomerForm=new FormGroup({
      name:new FormControl('',Validators.required)
    })

    ngOnInit(){
      this.errorMsg="";
      this.successMsg=""
      this.allCustomers = this.customerService.getAllCustomersFromStorage();
      if(!this.allCustomers || this.allCustomers.length === 0 ){
        this.customerService.getAllCustomers().subscribe(
          data=>{
            console.log("Get All Customers API Call Response-->",data)
            if(data.status==='SUCCESS'){
              for(let customer of data.data){
              this.allCustomers.push(customer)
              }
              this.customerService.setAllCustomers(this.allCustomers)
            }
          }
        )
      }
    }

    ngOnChanges(changes:SimpleChanges){
      if(!changes.refreshForecastToggle.firstChange && (changes.refreshForecastToggle.previousValue !== changes.refreshForecastToggle.currentValue)){
        this.refresh()
      }
    }

    refresh(){
      localStorage.removeItem('customers')
      this.allCustomers=[]
      this.customerService.getAllCustomers().subscribe(
        data=>{
          console.log("Get All Customers API Call Response-->",data)
          if(data.status==='SUCCESS'){
            for(let customer of data.data){
            this.allCustomers.push(customer)
            }
            this.customerService.setAllCustomers(this.allCustomers)
          }
        }
      )
    }

    onCreateCustomerSubmit(){
      this.errorMsg="";
      this.successMsg=""
        if(!this.createCustomerForm.invalid){
         this.customerService.createCustomer(this.createCustomerForm.value).subscribe(data=>{
           console.log(data)
           this.successMsg=data.message;
          this.deleteCustomerForm.reset()
          this.refresh();
          this.createCustomerForm.reset();
         },error=>{
           this.errorMsg="Something went wrong"
          this.deleteCustomerForm.reset()
         })
        }
    }

    updateCustomer(){
      this.errorMsg="";
      this.successMsg="";
      let customer={
        ...this.updateCustomerForm.value
      }
      //delete id and nulls
      delete customer.id
      if(!customer.telephoneNumber){
        delete customer.telephoneNumber;
      }
      if(!customer.location){
        delete customer.location
      }
      if(!customer.personOfContact){
        delete customer.personOfContact
      }
      if(!customer.numberOfEmployees){
        delete customer.numberOfEmployees
      }
      console.log("Update customer payload", customer)
        if(this.getUpdateFormValidity()){
         this.customerService.updateCustomer(this.updateCustomerForm.value.id, customer).subscribe(data=>{
           console.log(data)
           this.successMsg=data.message;
           this.updateCustomerForm.reset();
           this.refresh();
         },error=>{
           this.errorMsg="Something went wrong"
           this.updateCustomerForm.reset();
         })
        }
    }

    deleteCustomer(){
      this.errorMsg="";
      this.successMsg="";
   
      if(this.getDeleteFormValidity()){
        this.customerService.deleteCustomer(this.deleteCustomerForm.value.name).subscribe(data=>{
          console.log(data)
          this.successMsg=data.message;
          this.refresh();
          this.deleteCustomerForm.reset()
        },error=>{
          this.errorMsg="Something went wrong"
          this.deleteCustomerForm.reset()
        })
      }
    }

    getIsFormValid(){
      return this.createCustomerForm.invalid;
    }

    getUpdateFormValidity(){
      return this.updateCustomerForm.get('id')?.value && (
        this.updateCustomerForm.get('personOfContact')?.value ||
        this.updateCustomerForm.get('telephoneNumber')?.value ||
        this.updateCustomerForm.get('numberOfEmployees')?.value ||
        this.updateCustomerForm.get('location')?.value
      )
    }

    getDeleteFormValidity(){
      return this.deleteCustomerForm.get('name')?.value
    }
}
