import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { EmbedService } from 'src/app/embed.service'
import { fromEvent } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AnalyticsService } from 'src/app/analytics.service';
import { TOPICS } from 'src/app/helpers/constants';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-widget-library',
  templateUrl: './widget-library.component.html',
  styleUrls: ['./widget-library.component.scss']
})
export class WidgetLibraryComponent implements OnInit, OnDestroy {
  embedList: any[] = []
  queryParams: any;
  limit = 2
  width: number
  widgetTitle = ''
  searchOptions = {
    topic: [
      {
        label: 'COVID-19',
        value: 'COVID-19',
      },
      // {
      //   label: 'COVID-19 Vaccine',
      //   value: 'COVID-19 Vaccine',
      // },
      // {
      //   label: 'Campaign Finance',
      //   value: 'Campaign Finance',
      // },
      // {
      //   label: 'Crime',
      //   value: 'Crime',
      // },
      // {
      //   label: 'Criminal Justice',
      //   value : 'Criminal Justice',
      // },
      // {
      //   label: 'Demographics',
      //   value : 'Demographics',
      // },
      // {
      //   label: 'Criminal Justice',
      //   value : 'Criminal Justice',
      // },
    ]
  };

  constructor(
    private embedService: EmbedService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private analytics: AnalyticsService,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.width = window.innerWidth
    }
    const title = 'Visualizations';
    const description = 'Expand your breadth of coverage using AI-powered visual journalism. No strings attached.';
    this.titleService.setTitle(`${title} - HiGeorge for Publishers Library`);
    this.metaService.updateTag({ name: 'description', content: description });

    this.embedService.getTopics().subscribe((list) => {
      this.searchOptions.topic = list.map(s => ({label: s, value: s}));
      this.load();
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (Object.keys(this.queryParams).length === 0) {
        this.queryParams = { topic: "COVID-19" }
      }
      this.load();
    });
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'scroll')
        .pipe(debounceTime(500))
        .subscribe(() => {
          if (window.scrollY + document.documentElement.offsetHeight >= 0.55 * document.documentElement.scrollHeight) {
            this.limit += 3
            this.analytics.analyticsEventEmitter('library_scroll', undefined, undefined, this.limit, { num: this.limit });
          }
        });

      fromEvent(window, 'resize')
        .pipe(debounceTime(500))
        .subscribe(() => {
          this.width = window.innerWidth
        });
    }
  }

  ngOnDestroy() {
  }

  updateSearchParams(params) {
    console.log(params)
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

  load() {
    const value = (this.queryParams.topic || 'COVID').trim();
    const topic = this.searchOptions.topic.find(t => t.value === value);
    this.widgetTitle = topic.label;

    this.embedService.getEmbeds(this.queryParams).subscribe((list) => {
      this.embedList = list.visualizations;
      this.limit = 5
    })
  }
}
