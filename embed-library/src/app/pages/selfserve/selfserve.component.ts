import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DemoService } from 'src/app/demo.service';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators';
import {AnalyticsService} from 'src/app/analytics.service'
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/components/popup/popup.component'

@Component({
  selector: 'app-selfserve-page',
  templateUrl: './selfserve.component.html',
  styleUrls: ['./selfserve.component.scss']
})
export class SelfserveComponent implements OnInit {
  submitted = false;
  location = null;
  partnerCode = '123';
  visualizations = [];
  isMobile = false;
  email = '';

  constructor(
    private demoService: DemoService,
    private analytics: AnalyticsService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.location = {state: "California", county: "San Francisco"};

    this.analytics.analyticsEventEmitter('landed_on_selfserve_page', 'selfserve', undefined, undefined, undefined);
    this.demoService.getEmbeds({
      ...this.location,
      partnerCode: this.partnerCode
    }).subscribe((data) => {
      this.visualizations = data.visualizations;
      console.log(this.visualizations);
    });

    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'resize')
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.isMobile = window.innerWidth < 768;
        });

      this.isMobile = window.innerWidth < 768;
    }
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '500px', disableClose: true,
    });

    

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.visualizations = [];
      this.location = result[0];
      this.email = result[1];
      this.demoService.getEmbeds({
        ...this.location,
        partnerCode: this.partnerCode
      }).subscribe((data) => {
        this.visualizations = data.visualizations;
      });
    });
    console.log(this.visualizations);
  }

  getEmbedCode(height,url) {
    return '<iframe style="display:block;" width="100%" height="'+height+'" src="'+url+'" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>';
  }

  copyEmbed(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  setUserInfo() {
    this.analytics.analyticsEventEmitter('selected_location', 'selfserve', undefined, undefined, {name: '', company: '', email: this.email});
    this.demoService.submitInfo({
      ...{name: '', company: '', email: this.email},
      ...this.location,
      partnerCode: this.partnerCode
    }).subscribe(data => {
      console.log(data);
    });
    console.log(this.visualizations);
  }
}
