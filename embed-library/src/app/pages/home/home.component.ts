import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/analytics.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hoverLogo: string = null;

  logos = [
    'advocate',
    'mission-local',
    'bkr',
    'eye',
    'NCHealth'
  ];

  constructor(
    private analytics: AnalyticsService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    const title = 'Home';
    const description = 'Add data visualizations to all your articles. Increase engagement. No Data background required.';
    this.titleService.setTitle(`${title} - HiGeorge for Publishers Library`);
    this.metaService.updateTag({ name: 'description', content: description });
  }

  trackClick(name, label?) {
    this.analytics.trackLink(name, label);
  }

  setHoverLogo(logo) {
    this.hoverLogo = logo;
  }

  logoUrl(logo) {
    return `assets/images/logos/${logo}${logo === this.hoverLogo ? '-hover' : ''}.png`;
  }
}
