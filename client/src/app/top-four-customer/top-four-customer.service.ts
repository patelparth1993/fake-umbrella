import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {environment} from "../../environments/environment.prod"
@Injectable({
  providedIn: 'root'
})
export class TopFourCustomerService {

  constructor(private http: HttpClient) { 
  }

 
  setTopFourCustomerForecast(input:any){
    console.log("log before storeage", input)
    localStorage.setItem('topFourCustomerForecast',JSON.stringify(input))
  }

  getTopFourCustomerForecastFromStorage():any{
    let result= localStorage.getItem('topFourCustomerForecast');
    return result ? JSON.parse(result) : []
  }

  getTopFourCustomerForecast(): Observable<any> {
    return this.http.get<[]>(environment.backend_URL+"customer/topcustomers")
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
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
