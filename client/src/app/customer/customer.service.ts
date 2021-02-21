import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {environment} from "../../environments/environment.prod"
import { Customer } from "../models/customer.model"
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  setAllCustomers(customers:any){
    localStorage.setItem('customers',JSON.stringify(customers))
  }

  getAllCustomersFromStorage():any{
    let result= localStorage.getItem('customers');
    return result ? JSON.parse(result) : []
  }

 getAllCustomers():Observable<any>{
  return this.http.get<[]>(environment.backend_URL+"customer/all")
  .pipe(
     catchError(this.handleError)
     );
 }

 updateCustomer(id:string,customer : Partial<Customer>): Observable<any> {
   console.log("Update Payload",customer)
  return this.http.post<[]>(environment.backend_URL+`customer/update/${id}`, customer)
  .pipe(
     catchError(this.handleError)
     );
}

 createCustomer(customer : Customer): Observable<any> {
    return this.http.post<[]>(environment.backend_URL+"customer/create", customer)
    .pipe(
       catchError(this.handleError)
       );
  }

  deleteCustomer(name:string): Observable<any> {
   return this.http.post<[]>(environment.backend_URL+`customer/delete/${name}`, null)
   .pipe(
      catchError(this.handleError)
      );
 }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.log(error)
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
