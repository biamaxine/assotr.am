import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { environment } from '../../../environments/environment';
import { CoverComponent } from '../../shared/components/cover/cover.component';
import { WorksComponent } from '../../shared/components/works/works.component';
import { Event } from '../../shared/interfaces/event.interface';
import { RouteService } from '../../shared/services/route.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CoverComponent, WorksComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit {
  url = environment.base_url + 'events/events_1.json';
  event!: Event;

  constructor(
    private readonly route: RouteService,
    private readonly http: HttpClient,
    private readonly renderer: Renderer2,
    private readonly element: ElementRef,
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0 });

    this.http.get<{ events: Event[] }>(this.url).subscribe(({ events }) => {
      const event = events.find((event) => event.id === this.route.getId());
      if (event) this.event = event;
      else {
        this.renderer.addClass(this.element.nativeElement, 'error-404');
      }
    });
  }

  onChildScrollCaptured(e: WheelEvent): void {
    e.stopPropagation();
  }
}
