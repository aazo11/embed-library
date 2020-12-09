import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EmbedService {
  private CYCServerURL = 'https://coreservices.hi-george.com/api/datainteractive' // Static server url base path
  private mockSearverUrl = 'https://b02e72dd-7f83-435a-a502-deadf6327a2e.mock.pstmn.io/visualization';
  constructor(private http: HttpClient) { }

  getEmbeds(searchParams: any = {}): Observable<any> {
    const params = []
    for (let key in searchParams) {
      if (!searchParams[key]) continue
      params.push(`${key}=${searchParams[key]}`)
    }
    const url = `${this.mockSearverUrl}?${params.join('&')}`
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
