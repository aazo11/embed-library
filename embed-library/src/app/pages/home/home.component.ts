import { Component } from '@angular/core';
import { AnalyticsService } from 'src/app/analytics.service';

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

  constructor(
    private analytics: AnalyticsService
  ) { }

  trackClick(name, label?) {
    this.analytics.trackLink(name, label);
  }
}
