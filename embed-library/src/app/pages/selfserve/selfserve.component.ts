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
  loading = [];

  defaultEmbed = [
    '<iframe style="display:block;" width="100%" height="700px" src="https://app.hi-george.com/v1/smartviz/covid/county_cases?state=California&county=San+Francisco&partner=123&start=2020-03-01&tz=America%2FNew_York&theme=higeorge&noCTA=1" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>',
    '<iframe style="display:block;" width="100%" height="700px" src="https://app.hi-george.com/v1/smartviz/covid/county_deaths?state=California&county=San+Francisco&partner=123&start=2020-03-01&tz=America%2FNew_York&theme=higeorge&noCTA=1" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>',
    '<iframe style="display:block;" width="100%" height="700px" src="https://app.hi-george.com/v1/smartviz/covid/state_cases?state=California&partner=123&start=2020-03-01&tz=America%2FNew_York&theme=higeorge&noCTA=1" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>',
    '<iframe style="display:block;" width="100%" height="700px" src="https://app.hi-george.com/v1/smartviz/covid/state_deaths?state=California&partner=123&start=2020-03-01&tz=America%2FNew_York&theme=higeorge&noCTA=1" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>',
    '<iframe style="display:block;" width="100%" height="700px" src="https://app.hi-george.com/v1/smartviz/covid/state_tests?state=California&partner=123&start=2020-03-01&tz=America%2FNew_York&theme=higeorge&noCTA=1" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>',
    '<iframe style="display:block;" width="100%" height="700px" src="https://app.hi-george.com/v1/smartviz/covid/state_icu?state=California&partner=123&start=2020-03-01&tz=America%2FNew_York&theme=higeorge&noCTA=1" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>',
    '<iframe style="display:block;" width="100%" height="700px" src="https://app.hi-george.com/v2/smartviz/newHomeListings?location=San+Francisco+County&stateAbbr=CA&regionType=county&partner=123" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>',
    '<iframe style="display:block;" width="100%" height="700px" src="https://app.hi-george.com/v2/smartviz/totalHomeSales?location=San+Francisco+County&stateAbbr=CA&regionType=county&partner=123" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>',
    '<iframe style="display:block;" width="100%" height="700px" src="https://app.hi-george.com/v2/smartviz/medianHomePrice?location=San+Francisco+County&stateAbbr=CA&regionType=county&partner=123" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>'
  ];

  defaultImg = [
    'assets/images/selfserve/viz1.png',
    'assets/images/selfserve/viz2.png',
    'assets/images/selfserve/viz3.png',
    'assets/images/selfserve/viz4.png',
    'assets/images/selfserve/viz5.png',
    'assets/images/selfserve/viz6.png',
    'assets/images/selfserve/viz7.png',
    'assets/images/selfserve/viz8.png',
    'assets/images/selfserve/viz9.png',
  ];

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
      this.submitted = true;
      console.log('The dialog was closed');
      this.visualizations = [];
      this.location = result[0];
      this.email = result[1];
      this.analytics.analyticsEventEmitter('user_entered_email_location', 'selfserve', undefined, undefined, {name: '', company: '', email: this.email});
      this.demoService.getEmbeds({
        ...this.location,
        partnerCode: this.partnerCode
      }).subscribe((data) => {
        this.visualizations = data.visualizations;
      });
    });
    console.log(this.visualizations);
  }

  iframeLoaded(i) {
    console.log(i)
      if (typeof this.loading.length[i] === 'undefined') {
        document.getElementById("loading-"+i).remove()
      }
  }

  getEmbedCode(height,url) {
    return '<iframe style="display:block;" width="100%" height="'+height+'" src="'+url+'" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>';
  }

  copyEmbed(inputElement) {
    this.analytics.analyticsEventEmitter('user_copied_embed_code', 'selfserve', undefined, undefined,undefined);
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  setUserInfo() {
    
    this.demoService.submitInfo({
      ...{name: '', company: '', email: this.email},
      ...this.location,
      partnerCode: this.partnerCode
    }).subscribe(data => {
      console.log(data);
    });
  }
}
