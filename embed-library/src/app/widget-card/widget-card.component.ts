import { Component, OnInit, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-widget-card',
  templateUrl: './widget-card.component.html',
  styleUrls: ['./widget-card.component.css']
})
export class WidgetCardComponent implements OnInit {
  @Input() campaignID: string[]
  @Input() embedTitle: string
  @Input() embedSubtitle: string
  @Input() embedDescription: string

  server_url = "https://callyourcongressperson.com/embed/" 
  iframeSRC: string;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.iframeSRC = this.server_url + this.campaignID

  }

}
