import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { environment } from '../../../../environments/environment';
import { Event } from '../../interfaces/event.interface';
import { WorkItemComponent } from './work-item/work-item.component';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [WorkItemComponent],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
})
export class WorksComponent implements OnInit {
  @Output() scrollCaptured = new EventEmitter<WheelEvent>();

  url = environment.base_url + 'events/events_1.json';
  events!: Event[];

  style: any = {};
  width = window.innerWidth;

  move = 0;
  timeout: any;

  @HostListener('window:resize') onResize() {
    this.update(window.innerWidth);
  }
  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ events: Event[] }>(this.url).subscribe(({ events }) => {
      // this.events = events;

      this.events = [];

      const event = events[0];
      for (let i = 0; i < 10; i++) {
        this.events.push({
          id: i.toString(),
          title: event.title,
          date: event.date,
          pictures: event.pictures,
          context: event.context,
          tag: event.tag,
        });
      }

      this.update(window.innerWidth);
      const length = this.events.length;
      this.style['s2'] = `width: calc(100%/${length});`;
    });
  }

  update(width: number) {
    this.width = width;

    const rem = 16;
    const margin = width < 720 ? 2 * rem : 6 * rem;
    const workWidth = width - margin - rem <= 360 ? width - margin - rem : 360;

    // const workQuantity = Math.floor((width - margin) / (workWidth + rem));

    const length = this.events.length;
    this.style['worksContainer'] =
      `width: calc(${workWidth}px * ${length} - 1rem);`;
  }

  onWheel(div: HTMLElement, e: WheelEvent) {
    this.move += e.deltaY;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      div.scrollTo({
        behavior: 'smooth',
        left: div.scrollLeft + this.move,
      });
      this.move = 0;
    }, 50);

    e.preventDefault();

    this.scrollCaptured.emit(e);
  }
}
