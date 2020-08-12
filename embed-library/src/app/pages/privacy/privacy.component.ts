import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    const title = 'Privacy Policy';
    const description = 'Dynamic Hello Angular Lovers description!';
    this.titleService.setTitle(`${title} - HiGeorge for Publishers Library`);
    this.metaService.updateTag({ name: 'description', content: description });
  }
}
