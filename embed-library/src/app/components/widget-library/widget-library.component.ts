import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { EmbedService } from 'src/app/embed.service'
import { fromEvent } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-widget-library',
  templateUrl: './widget-library.component.html',
  styleUrls: ['./widget-library.component.scss']
})
export class WidgetLibraryComponent implements OnInit, OnDestroy {
  embedList: any[] = []
  queryParams: any = {};
  limit = 2

  constructor(
    private embedService: EmbedService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.embedService.getEmbeds(this.queryParams).subscribe((list) => {
        this.embedList = list
        this.limit = 2
      })
    });
    if(isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'scroll')
        .pipe(debounceTime(500))
        .subscribe(() => {
          if (window.scrollY + document.documentElement.offsetHeight >= 0.85 * document.documentElement.scrollHeight) {
            this.limit += 2
          }
        });
    }
  }

  ngOnDestroy() {
  }

  updateSearchParams(params) {
    const queryParams = {};
    Object.keys(params).forEach(key => {
      if (params[key]) queryParams[key] = params[key];
    });
    this.router.navigate([], { queryParams });
  }

  getJSON(list: string){
    return JSON.parse(list)
  }
}
