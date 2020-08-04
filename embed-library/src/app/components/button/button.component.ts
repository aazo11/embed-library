import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor (
    private router: Router,
  ) {}

  handleClick() {
    if (this.url) {
      this.router.navigate([this.url]);
    } else {
      this.change.emit();
    }
  }
}
