import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/analytics.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  constructor(
    private analytics: AnalyticsService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    const title = 'Company';
    const description = 'Our mission -- help newsrooms make use of the world\'s data.';
    this.titleService.setTitle(`${title} - HiGeorge for Publishers Library`);
    this.metaService.updateTag({ name: 'description', content: description });
  }

  trackClick(name: string, label?: string) {
    this.analytics.trackLink(name, label);
  }
}
