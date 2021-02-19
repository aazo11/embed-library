import { Component, Input } from '@angular/core';
import { AnalyticsService } from 'src/app/analytics.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() active = -1;

  constructor(
    private analytics: AnalyticsService
  ) { }

  menuItems = [
    { label: 'How it works', path: '/how-it-works' },
    { label: 'Success stories', path:'/success-stories'},
    { label: 'Visualizations', path: '/visualizations' },
    { label: 'Company', path: '/company' },
    { label: 'Advisors', path: '/advisors' },
    { label: 'Contact', path: '/contact' },
  ];

  clickLink(name: string, label?: string) {
    this.analytics.trackLink(name);
  }
}
