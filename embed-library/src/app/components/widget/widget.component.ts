import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { WidgetDialogComponent } from 'src/app/components/widget-dialog/widget-dialog.component';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() campaign: any

  embedCodeHTML: string

  server_url = "https://callyourcongressperson.com/datainteractive/" 
  iframeSRC: string;

  constructor(
    public sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.iframeSRC = this.server_url + this.campaign._id.$oid
    this.embedCodeHTML = '<iframe style="display:block;" width="665px" height="530px" src="' + this.iframeSRC + '" frameborder="0"></iframe>'
  }

  getCodeForWidget(): void {
    // this.copyEmbedCode.emit(this.campaign.embedTitleInLibrary)
  }

  openDialog(): void {
    this.dialog.open(WidgetDialogComponent, {
      width: '520px',
      data: { src: this.iframeSRC },
    });
  }
}
