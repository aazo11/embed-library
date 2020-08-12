import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    const title = 'How it works';
    const description = 'See how you can easily complement your stories with interactive data visualizations and increase reader engagement.';
    this.titleService.setTitle(`${title} - HiGeorge for Publishers Library`);
    this.metaService.updateTag({ name: 'description', content: description });
  }
}
