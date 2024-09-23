import { Component } from '@angular/core';

import { NavOptionComponent } from './nav-option/nav-option.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavOptionComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {}
