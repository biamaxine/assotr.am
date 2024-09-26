import { Component, Input } from '@angular/core';

import { BtnDropdownComponent } from '../../../../shared/components/btn-dropdown/btn-dropdown.component';
import { Colaborator } from '../../../../shared/interfaces/colaborator.interface';

@Component({
  selector: 'app-colaborator',
  standalone: true,
  imports: [BtnDropdownComponent],
  templateUrl: './colaborator.component.html',
  styleUrl: './colaborator.component.scss',
})
export class ColaboratorComponent {
  @Input({ required: true }) data!: Colaborator;
}
