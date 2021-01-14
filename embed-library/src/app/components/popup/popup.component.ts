import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';
import { AnalyticsService } from 'src/app/analytics.service';
import { EmbedService } from 'src/app/embed.service';
import { DemoService } from 'src/app/demo.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

/**
 * @title Dialog Overview
 */
// @Component({
//   selector: 'dialog-overview-example',
//   templateUrl: 'dialog-overview-example.html',
//   styleUrls: ['./search.component.scss']
// })
// export class DialogOverviewExample {

//   animal: string;
//   name: string;

//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(PopupComponent, {
//       width: '500px',
//       data: {name: this.name, animal: this.animal}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       this.animal = result;
//     });
//   }

// }

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Output() submit = new EventEmitter<any>();

  location = null;
  email = '';
  partnerCode = '123';
  visualizations = null;

  constructor(
    private demoService: DemoService,
    public dialogRef: MatDialogRef<PopupComponent>,
   ) {}
  
  setLocation(submitted) {
      this.dialogRef.close(submitted);
    }
}
