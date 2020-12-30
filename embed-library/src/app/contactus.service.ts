import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import {tap, map, catchError} from 'rxjs/operators';
import {serverURL} from 'src/app/models/settings'

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private http:HttpClient) { }

  sendContactUsNote(email:string, name:string, subject: string, message:string){
    const url = serverURL + "/contactus"

    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const data = {'email': email, 'name': name, 'subject': subject, 'messageBody': message};
    return this.http.post(url, data, config).pipe(
      catchError(this.handleError()))
     
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead
      // Let the app keep running by returning an empty result.
      return throwError(error.error.detail)
    }
  }
}
