import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { Event } from '../../../interfaces/event.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-work-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './work-item.component.html',
  styleUrl: './work-item.component.scss',
})
export class WorkItemComponent implements OnInit {
  @Input({ required: true }) work!: Event;

  constructor(
    private readonly renderer: Renderer2,
    private readonly element: ElementRef,
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-image',
      `url('${this.work.pictures[0]}')`,
    );
  }

  generateLink() {
    const title = this.work.title.full.replace(/ /g, '_');
    return `/event/${title}_id_${this.work.id}`;
  }
}
