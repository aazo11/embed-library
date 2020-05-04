import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {EmbedService} from 'src/app/embed.service'
import {  Observable } from 'rxjs'
import {MatSnackBar} from '@angular/material/snack-bar'
import qs from '../helpers/querystring'



@Component({
  selector: 'app-widget-library',
  templateUrl: './widget-library.component.html',
  styleUrls: ['./widget-library.component.css']
})
export class WidgetLibraryComponent implements OnInit {
  embedList$:Observable<string[]>
  constructor(private embedService: EmbedService,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.embedList$ = this.embedService.getEmbeds()
  }

  // We open snackbar when user has been logged out
  embedCopied(title: string) {
    this.snackBar.open('Embed code copied to clipboard', undefined, {
      duration: 2000,
    })
    
    const params = {
      to: 'partnerships@reconntinglabs.com',
      subject: 'Revenue share account request',
      body:'We are interested in getting a partner account to generate revenue on embed visualization "' +  title + '"'
       
        
    }
    window.location.href = 'mailto:?'+qs.stringify(params)
    
  }
}
