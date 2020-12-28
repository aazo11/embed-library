import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DemoService } from 'src/app/demo.service';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  submitted = false;
  location = null;
  partnerCode = 123;
  visualizations = [];
  isMobile = false;

  constructor(
    private demoService: DemoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.location = null;

    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'resize')
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.isMobile = window.innerWidth < 768;
        });

      this.isMobile = window.innerWidth < 768;
    }
  }

  setLocation(location) {
    this.location = location;

    this.demoService.getEmbeds({
      ...this.location,
      partnerCode: this.partnerCode
    }).subscribe((data) => {
      this.visualizations = data.visualizations;
    });
  }

  setUserInfo(userInfo) {
    this.demoService.submitInfo({
      ...userInfo,
      ...this.location,
      partnerCode: this.partnerCode
    }).subscribe(data => {
      console.log(data);
    });

    this.submitted = true;
  }
}
