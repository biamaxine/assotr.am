import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-option',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-option.component.html',
  styleUrl: './nav-option.component.scss',
})
export class NavOptionComponent {
  @Input() route!: string;
}
