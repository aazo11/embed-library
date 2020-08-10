import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { AnalyticsService } from 'src/app/analytics.service';

@Component({
  selector: 'app-widget-dialog',
  templateUrl: './widget-dialog.component.html',
  styleUrls: ['./widget-dialog.component.scss']
})
export class WidgetDialogComponent {
  width = '100%';
  height = '700px';
  src: string;

  constructor(
    private snackBar: MatSnackBar,
    private analytics: AnalyticsService,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.src = data.src;
  }

  get embedCodeHTML(): string {
    return `<iframe style="display:block;" width="${this.width}" height="${this.height}" src="${this.src}" frameborder="0"></iframe>`;
  }

  copy() {
    this.analytics.analyticsEventEmitter('copy_embed_code', this.src);
    this.snackBar.open('Embed code copied to clipboard, contact us for revenue share opportunities.', undefined, {
      duration: 2000,
    });
  }

  clickLink(name: string, label?: string) {
    this.analytics.trackLink(name, label);
  }
}
