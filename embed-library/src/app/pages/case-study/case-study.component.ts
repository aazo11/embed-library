import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { contents } from './constants';

@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss']
})
export class CaseStudyComponent implements OnInit{
  brand: string

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.brand = this.route.snapshot.params.brand;
  }

  get content(): any {
    console.log(this.brand)
    return contents[this.brand]
  }

  imageUrl(title): string {
    return `assets/images/case-study/${this.brand}/${title}.png`;
  }
}
