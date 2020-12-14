import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';
import { AnalyticsService } from 'src/app/analytics.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  _params = new BehaviorSubject<any>({ topic: 'COVID' });

  // constants
  searchOptions = {
    topic: [
      {
        label: 'COVID-19',
        value: 'COVID-19',
      },
      {
        label: 'Campaign Finance',
        value: 'Campaign Finance',
      },
      {
        label: 'Criminal Justice',
        value: 'Criminal Justice',
      },
      {
        label: 'Election Polls',
        value: 'Polling',
      },
      
      {
        label: 'Police Statistics',
        value: 'Policing',
      },
      {
        label: 'Real Estate',
        value: 'Real Estate',
      },
      {
        label: 'Voter Registration',
        value: 'Voter Registration',
      }
    ]
  };

  @Input() set params(value) {
    if (value) this._params.next(value);
  }
  @Output() update = new EventEmitter<any>();

  constructor(private analytics: AnalyticsService) { }

  ngOnInit() {
    this._params.pipe(
      skip(1),
      debounceTime(500),
      distinctUntilChanged((a: any, b: any) => {
        let result = true;
        ['topic'].forEach(key => {
          result = result && (a[key] === b[key]);
        });
        return result;
      }),
    ).subscribe((terms: any) => {
      this.update.emit(terms);
    });
  }

  searchByTopic(event) {
    this.updateSearch('topic', event.value);
    this.analytics.analyticsEventEmitter('search', 'topic', event.value);
  }

  requestViz() {
    this.analytics.trackLink('search_request_link', 'request_viz');
  }

  private updateSearch(key, value) {
    this._params.next({
      ...this._params.value,
      [key]: value
    });
  }

  getJSON(list: string) {
    return JSON.parse(list)
  }
}
