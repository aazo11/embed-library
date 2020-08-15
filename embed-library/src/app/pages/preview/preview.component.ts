import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }
  ids: string[];
  queryParams: URLSearchParams[];
  previewHeights: string[];

  private collections = {
    covid: this.covidDashboard
  };

  private covidDashboard(comp: PreviewComponent, params: ParamMap) {
    comp.ids = [];
    comp.previewHeights = [];
    if (params.get('county')) {
      comp.ids.push('5f20ed3eaaff4e1186cd46e3', '5f2851667db7754c3cf2780a', '5f3710a103614b2c289f8bc0');
      comp.previewHeights.push('700', '700', '450');
    }

    comp.ids.push('5f2851397db7754c3cf27808', '5f28514c7db7754c3cf27809', '5f31ffe2de59950c38c8ffa3', '5f3710a103614b2c289f8bc0');
    comp.previewHeights.push('700', '700', '775', '450');

    comp.queryParams = comp.ids.map(i => new URLSearchParams());
    for (const key of params.keys) {
      if (!key.startsWith('preview')) {
        comp.queryParams.forEach((u, i) => {
          if (i > 2 && key === 'county') {
            return;
          }
          u.set(key, params.get(key));
        });
      }
    }

    if (params.get('county')) {
      comp.queryParams[2].set('homepageMode', '1');
      comp.queryParams[2].set('noCTA', '1');
      comp.queryParams[2].set('noGraph', '1');
      comp.queryParams[6].set('homepageMode', '1');
      comp.queryParams[6].set('noCTA', '1');
      comp.queryParams[6].set('noGraph', '1');
    } else {
      comp.queryParams[3].set('homepageMode', '1');
      comp.queryParams[3].set('noCTA', '1');
      comp.queryParams[3].set('noGraph', '1');
    }
  }

  private defaultDashboard(comp: PreviewComponent, originalQueryParams: ParamMap) {
    comp.ids = originalQueryParams.get('ids').split(',');
    comp.queryParams = comp.ids.map(i => new URLSearchParams());

    for (const key of originalQueryParams.keys) {
      if (key === 'ids' || key.startsWith('preview')) {
        continue;
      }
      const values = originalQueryParams.get(key).split(',');
      for (let i = 0; i < values.length; i++) {
        if (values[i]) {
          comp.queryParams[i].append(key, values[i]);
        }
      }
    }
  }

  ngOnInit() {
    const originalQueryParams = this.route.snapshot.queryParamMap;
    const collection = this.route.snapshot.paramMap.get('collection');

    if (collection && collection in this.collections) {
      console.log('Collection', collection);
      this.collections[collection](this, originalQueryParams);
    } else {
      this.defaultDashboard(this, originalQueryParams);
    }

    if (!this.previewHeights) {
      this.previewHeights = this.ids.map(i => '700');
    }

    if (originalQueryParams.has('previewHeights')) {
      originalQueryParams.get('previewHeights').split(',').forEach((v, i) => {
        if (v) {
          this.previewHeights[i] = v;
        }
      });
    }
  }
}
