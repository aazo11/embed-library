import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.css']
})
export class TosComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    const title = 'Terms of Service';
    const description = 'Dynamic Hello Angular Lovers description!';
    this.titleService.setTitle(`${title} - HiGeorge for Publishers Library`);
    this.metaService.updateTag({ name: 'description', content: description });
  }

}
