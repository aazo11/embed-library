import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import {serverURL} from 'src/app/models/settings'

@Injectable({
  providedIn: 'root'
})
export class EmbedService {
  //private CYCServerURL = 'https://coreservices.hi-george.com/api/datainteractive' // Static server url base path
  //private mockSearverUrl = 'https://coreservices.hi-george.com/api/v1/visualizations';
  private url = serverURL + '/visualizations'
  constructor(private http: HttpClient) { }

  getEmbeds(searchParams: any = {}): Observable<any> {
    const params = []
    for (let key in searchParams) {
      if (!searchParams[key]) continue
      params.push(`${key}=${searchParams[key]}`)
    }
    const url = `${this.url}?${params.join('&')}`
    return this.http.get<any>(url).pipe(
      catchError(this.handleError('getCampaign', null)),
    )
  }

  getTopics(): Observable<string[]> {
    return this.http.get<string[]>(serverURL + '/visualization_categories').pipe(
      catchError(this.handleError('getTopics', null))
    );
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
