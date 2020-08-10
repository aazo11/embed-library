import { Component } from '@angular/core';
import { AnalyticsService } from 'src/app/analytics.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  constructor(
    private analytics: AnalyticsService
  ) { }

  trackClick(name: string, label?: string) {
    this.analytics.trackLink(name, label);
  }
}
