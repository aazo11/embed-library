import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  logos = [
    'forbes',
    'advocate',
    'mission-local',
    'bkr',
    'eye'
  ];

  constructor() { }
}
