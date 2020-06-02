import { Injectable } from '@angular/core';
import { of, Observable, pipe, throwError, from, Subject, BehaviorSubject } from 'rxjs'
import { tap, map, catchError, flatMap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EmbedService {
  private CYCServerURL = 'https://coreservices.hi-george.com/api/embed' // Static server url base path
  constructor(private http: HttpClient) { }

  getEmbeds(searchParams: any = {}): Observable<string[]> {
    console.log(searchParams)
    const params = []
    for (let key in searchParams) {
      if (!searchParams[key]) continue
      params.push(`${key}=${searchParams[key]}`)
    }
    const url = `${this.CYCServerURL}?${params.join('&')}`
    return this.http.get<any>(url).pipe(
      catchError(this.handleError('getCampaign', null)),
    )
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
