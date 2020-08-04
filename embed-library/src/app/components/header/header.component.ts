import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() active = -1;

  menuItems = [
    { label: 'How it works', path: '/how-it-works' },
    { label: 'Visualizations', path: '/visualizations' },
    { label: 'Company', path: '/company' },
    { label: 'Contact', path: '/contact' },
  ];
}
