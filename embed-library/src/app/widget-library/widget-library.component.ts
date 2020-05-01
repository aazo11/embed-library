import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {EmbedService} from 'src/app/embed.service'
import {  Observable } from 'rxjs'



@Component({
  selector: 'app-widget-library',
  templateUrl: './widget-library.component.html',
  styleUrls: ['./widget-library.component.css']
})
export class WidgetLibraryComponent implements OnInit {
  embedList$:Observable<string[]>
  constructor(private embedService: EmbedService) { }

  ngOnInit(): void {
    this.embedList$ = this.embedService.getEmbeds()
  }

}
