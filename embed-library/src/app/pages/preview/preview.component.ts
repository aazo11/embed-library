import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DemoService } from 'src/app/demo.service';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  constructor(
    private demoService: DemoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) { }
  ids: string[];
  queryParams: URLSearchParams[];
  previewHeights: string[];
  location = null;
  visualizations = [];
  isMobile = false;
  partnerCode = '123';

  ngOnInit() {
    const originalQueryParams = this.route.snapshot.queryParamMap;
    this.location = {county:'New York', state:'New York'}

    this.demoService.getEmbeds({
      ...this.location,
      partnerCode: this.partnerCode
    }).subscribe((data) => {
      this.visualizations = data.visualizations;
      console.log(this.visualizations)
    });

    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'resize')
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.isMobile = window.innerWidth < 768;
        });

      this.isMobile = window.innerWidth < 768;
    }

    
  }

  getEmbedCode(height,url) {
    return '<iframe style="display:block;" width="100%" height="'+height+'" src="'+url.replace("123",this.partnerCode)+'" class="hg-data-interactive" frameborder="0" scrolling="no"></iframe>';
  }

 
}
