import { Component } from '@angular/core';

import { CoverComponent } from '../../shared/components/cover/cover.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoverComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
