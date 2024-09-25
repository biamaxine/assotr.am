import { Component } from '@angular/core';

import { CoverComponent } from '../../shared/components/cover/cover.component';
import { WorksComponent } from '../../shared/components/works/works.component';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoverComponent, AboutComponent, WorksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  onChildScrollCaptured(e: WheelEvent): void {
    e.stopPropagation();
  }
}
