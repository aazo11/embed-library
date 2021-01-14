import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/analytics.service';
import { STATES, COUNTIES } from 'src/app/helpers/constants';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-selfserve-search',
  templateUrl: './selfserve-search.component.html',
  styleUrls: ['./selfserve-search.component.scss']
})
export class SelfserveSearchComponent implements OnInit {
  @Output() submit = new EventEmitter<any>();

  state = '';
  county = '';
  email = '';
  stateOptions = STATES;
  countyOptions = [];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private analytics: AnalyticsService) { }

  ngOnInit() { 
  }

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
    this.email = (document.getElementById("email") as HTMLInputElement).value;
    if (!this.state || !this.county || this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required')) return;

    this.submit.emit([{ state: this.state, county: this.county }, this.email]);
  }
}
