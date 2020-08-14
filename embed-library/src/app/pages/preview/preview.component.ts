import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  ids: string[];
  queryParams: URLSearchParams[];
  previewHeights: string[];
  previewShadow = false;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    const originalQueryParams = this.route.snapshot.queryParamMap;

    this.ids = originalQueryParams.get('ids').split(',');
    this.queryParams = this.ids.map(i => new URLSearchParams());

    this.previewHeights = this.ids.map(i => '700');
    if (originalQueryParams.has('previewHeights')) {
      originalQueryParams.get('previewHeights').split(',').forEach((v, i) => {
        if (v) {
          this.previewHeights[i] = v;
        }
      });
    }

    this.previewShadow = !!Number.parseInt(originalQueryParams.get('previewShadow'), 10);

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
}
