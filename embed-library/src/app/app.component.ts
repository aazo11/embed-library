import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AnalyticsService } from './analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'embed-library';

  constructor(
    private router: Router,
    private analyticsService: AnalyticsService
  ) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.analyticsService.analyticsEventEmitter('Page View');
        this.analyticsService.trackPageview(event.urlAfterRedirects);
      }
    });
  }
}
