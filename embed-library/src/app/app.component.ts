import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AnalyticsService } from './analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'embed-library';

  constructor(
    private router: Router,
    private analyticsService: AnalyticsService
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        analyticsService.analyticsEventEmitter('Page View');
      }
    });
  }
}
