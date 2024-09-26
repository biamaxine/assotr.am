import { Component, Input } from '@angular/core';

import { Ico } from '../../types/ico.type';

@Component({
  selector: 'app-ico',
  standalone: true,
  imports: [],
  templateUrl: './ico.component.html',
  styleUrl: './ico.component.scss',
})
export class IcoComponent {
  @Input({ required: true }) ico!: Ico;
}
