import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { WidgetDialogComponent } from 'src/app/components/widget-dialog/widget-dialog.component';
import { AnalyticsService } from 'src/app/analytics.service';
import { STATES, COUNTIES } from 'src/app/helpers/constants';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() campaign: any
  @Input() mobile: boolean
  @Input() title: string
  @Input() contactForAvailability: boolean

  embedCodeHTML: string

  // server_url = "https://callyourcongressperson.com/datainteractive/"
  iframeSRC: string;
  height: string;
  parameters = [];

  states = STATES
  counties = []
  state = null
  county = ''

  constructor(
    public sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private analytics: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.iframeSRC = this.campaign.url
    this.height = this.mobile ? this.campaign.heightMobile : this.campaign.heightDesktop;
    const list = ['state', 'county'];
    this.parameters = this.campaign.parameters.filter(item => list.includes(item));

    const url = new URL(this.campaign.url);
    if (url && this.parameters.length > 0) {
      this.county = url.searchParams.get('county') || '';
      const stateName = url.searchParams.get('state') ? url.searchParams.get('state').trim() : '';
      this.state = this.states.find(s => s.name === stateName);
    }

    this.setCounties();
  }

  selectState(event): void {
    this.state = this.states.find(s => s.abbr === event.value);
    this.county = '';
    this.setCounties();
    this.updateUrl();
  }

  selectCounty(event): void {
    this.county = event.value
    this.updateUrl();
  }

  setCounties(): void {
    if (this.state) {
      this.counties = COUNTIES[this.state.abbr];
    } else {
      this.counties = [];
    }
  }

  updateUrl() {
    const url = new URL(this.iframeSRC);
    if (this.parameters.includes('county')) {
      if (!this.county) return;
      url.searchParams.set('county', this.county);
    }
    if (this.parameters.includes('state')) {
      if (!this.state) return;
      url.searchParams.set('state', this.state.name);
    }
    this.iframeSRC = url.toString();
  }

  // getCodeForWidget(): void {
  //   // this.copyEmbedCode.emit(this.campaign.embedTitleInLibrary)
  // }

  // requestViz() {
  //   this.analytics.trackLink('library_request_link', 'request_viz', undefined, { dataInteractiveId: this.campaign._id.$oid });
  // }

  // openDialog(): void {
  //   this.analytics.analyticsEventEmitter('use_viz_button', this.campaign._id.$oid, undefined, undefined, { dataInteractiveId: this.campaign._id.$oid });
  //   this.dialog.open(WidgetDialogComponent, {
  //     width: '520px',
  //     data: { src: this.iframeSRC },
  //   });
  // }
}
