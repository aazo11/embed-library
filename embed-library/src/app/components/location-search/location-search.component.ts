import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/analytics.service';
import { STATES, COUNTIES } from 'src/app/helpers/constants';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  @Output() submit = new EventEmitter<any>();

  state = '';
  county = '';
  stateOptions = STATES;
  countyOptions = [];

  constructor(private analytics: AnalyticsService) { }

  ngOnInit() { }

  setState(e) {
    if (this.state === e.value) return;

    const state = this.stateOptions.find(s => s.name === e.value);
    if (state) {
      this.state = state.name;
      this.county = '';
      this.countyOptions = COUNTIES[state.abbr];
    } else {
      this.state = '';
      this.county = '';
      this.countyOptions = [];
    }
  }

  setCounty(e) {
    this.county = e.value;
  }

  handleSubmit() {
    if (!this.state || !this.county) return;

    this.submit.emit({ state: this.state, county: this.county });
  }
}
