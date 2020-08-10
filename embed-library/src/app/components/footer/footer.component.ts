import { Component, Input } from '@angular/core';
import { AnalyticsService } from 'src/app/analytics.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(
    private analytics: AnalyticsService
  ) {}

  clickSocial(site: string) {
    this.analytics.trackLink('social_link', site);
  }

  clickLink(name: string) {
    this.analytics.trackLink(name);
  }
}
