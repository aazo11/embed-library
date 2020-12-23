import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  private mockSearverUrl = 'https://75c30e25-d8b2-41b7-bbcf-40e7bd7b4ffe.mock.pstmn.io';
  constructor(private http: HttpClient) { }

  getEmbeds(searchParams: any = {}): Observable<any> {
    const params = []
    for (let key in searchParams) {
      if (!searchParams[key]) continue
      params.push(`${key}=${searchParams[key]}`)
    }
    // state=California&county=Alameda&partnerCode=123
    const url = `${this.mockSearverUrl}/visualization?${params.join('&')}`
    return this.http.get<any>(url).pipe(
      catchError(this.handleError('getCampaign', null)),
    )
  }

  submitInfo(data) {
    const url = `${this.mockSearverUrl}/partnerRequest`;

    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(url, data, config).pipe(catchError(this.handleError()));
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
