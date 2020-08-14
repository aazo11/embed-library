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

  private covidDashboard(idArr: string[], qpArr: URLSearchParams[], params: ParamMap) {
    if (params.get('county')) {
      idArr.push('5f20ed3eaaff4e1186cd46e3', '5f2851667db7754c3cf2780a');
    }

    idArr.push('5f2851397db7754c3cf27808', '5f28514c7db7754c3cf27809', '5f31ffe2de59950c38c8ffa3');

    qpArr.push(...idArr.map(i => new URLSearchParams()));
    for (const key of params.keys) {
      if (!key.startsWith('preview')) {
        qpArr.forEach((u, i) => {
          if (i > 1 && key === 'county') {
            return;
          }
          u.set(key, params.get(key));
        });
      }
    }
  }

  private defaultDashboard(originalQueryParams: ParamMap) {
    this.ids = originalQueryParams.get('ids').split(',');
    this.queryParams = this.ids.map(i => new URLSearchParams());

    for (const key of originalQueryParams.keys) {
      if (key === 'ids' || key.startsWith('preview')) {
        continue;
      }
      const values = originalQueryParams.get(key).split(',');
      for (let i = 0; i < values.length; i++) {
        if (values[i]) {
          this.queryParams[i].append(key, values[i]);
        }
      }
    }
  }

  ngOnInit() {
    const originalQueryParams = this.route.snapshot.queryParamMap;
    const collection = this.route.snapshot.paramMap.get('collection');

    if (collection && collection in this.collections) {
      console.log('Collection', collection);
      this.ids = [];
      this.queryParams = [];
      this.collections[collection](this.ids, this.queryParams, originalQueryParams);
    } else {
      this.defaultDashboard(originalQueryParams);
    }

    this.previewHeights = this.ids.map(i => '700');
    if (originalQueryParams.has('previewHeights')) {
      originalQueryParams.get('previewHeights').split(',').forEach((v, i) => {
        if (v) {
          this.previewHeights[i] = v;
        }
      });
    }
  }
}
