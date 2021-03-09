import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  constructor( private meta: Meta) { }
  IMAGEURL:string = "https://hi-george.s3.amazonaws.com/random/YC.png"

  ngOnInit(): void {
    this.meta.addTag({name: 'twitter:card', content: 'summary_large_image'});
    this.meta.addTag({name: 'twitter:title', content: 'YC Funds HiGeorge'})
    this.meta.addTag({name: 'og:title', content: 'YC Funds HiGeorge'})
    this.meta.addTag({name: 'twitter:image', content: this.IMAGEURL })
    this.meta.addTag({name: 'og:image', content:this.IMAGEURL})
  }

}
