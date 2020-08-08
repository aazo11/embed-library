import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/app/analytics.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() url = '';
  @Input() type = ''
  @Input() color = 'blue';
  @Input() width = '200px';

  @Output() change = new EventEmitter();

  @ViewChild('btn') btnElement: ElementRef;

  constructor (
    private router: Router,
    private analytics: AnalyticsService
  ) {}

  handleClick() {
    this.analytics.trackLink(this.btnElement.nativeElement.textContent, 'Button');
    if (this.url) {
      this.router.navigate([this.url]);
    } else {
      this.change.emit();
    }
  }
}
