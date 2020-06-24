import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-widget-dialog',
  templateUrl: './widget-dialog.component.html',
  styleUrls: ['./widget-dialog.component.scss']
})
export class WidgetDialogComponent {
  width = '665px';
  height = '530px';
  src: string;

  constructor(
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.src = data.src;
  }

  get embedCodeHTML(): string {
    return `<iframe style="display:block;" width="${this.width}" height="${this.height}" src="${this.src}" frameborder="0"></iframe>`;
  }

  copy() {
    this.snackBar.open('Embed code copied to clipboard, contact us for revenue share opportunities.', undefined, {
      duration: 2000,
    });
  }
}
