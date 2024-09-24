import { Component, Input } from '@angular/core';
import { Palette } from '../../types/palette.type';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  @Input() color: Palette = 'light';
}
