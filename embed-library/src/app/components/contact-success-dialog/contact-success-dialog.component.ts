import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { AnalyticsService } from 'src/app/analytics.service';

@Component({
  selector: 'app-contact-success-dialog',
  templateUrl: './contact-success-dialog.component.html',
  styleUrls: ['./contact-success-dialog.component.scss']
})
export class ContactSuccessDialogComponent {
  data: any = null
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.data = data
  }
}
