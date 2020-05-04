import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() copyEmbedCode = new EventEmitter<string>()

  embedCodeHTML: string

  server_url = "https://callyourcongressperson.com/embed/" 
  iframeSRC: string;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.iframeSRC = this.server_url + this.campaignID
    this.embedCodeHTML =  '<iframe style="display:block;" width="665" height="530" partnerID="" src="' + this.iframeSRC +'" frameBorder="0"></iframe>' 

  }

  getCodeForWidget():void{
    //console.log('get code for widget');
    this.copyEmbedCode.emit(this.embedTitle)

  }
}
