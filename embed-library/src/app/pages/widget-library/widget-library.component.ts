import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { EmbedService } from 'src/app/embed.service'
import { fromEvent } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AnalyticsService } from 'src/app/analytics.service';

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
    private analytics: AnalyticsService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    const title = 'Visualizations';
    const description = 'Expand your breadth of coverage using AI-powered visual journalism. No strings attached.';
    this.titleService.setTitle(`${title} - HiGeorge for Publishers Library`);
    this.metaService.updateTag({ name: 'description', content: description });

    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.embedService.getEmbeds(this.queryParams).subscribe((list) => {
        this.embedList = list
        this.limit = 2
      })
    });

    fromEvent(window, 'scroll')
      .pipe(debounceTime(500))
      .subscribe(() => {
        if (window.scrollY + document.documentElement.offsetHeight >= 0.85 * document.documentElement.scrollHeight) {
          this.limit += 2
          this.analytics.analyticsEventEmitter('library_scroll', undefined, undefined, this.limit, { num: this.limit });
        }
      });
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

  getJSON(list: string) {
    return JSON.parse(list)
  }

  trackClick(name, label?) {
    this.analytics.trackLink(name, label);
  }
}
