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
import { WheelService } from '../../services/wheel.service';
import { WorkItemComponent } from './work-item/work-item.component';
import { ScrollService } from '../../services/scroll.service';

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
  events: Event[] = [];

  style: { container?: string; content?: string } = {};
  width = window.innerWidth;

  @ViewChild('main', { static: true }) main!: ElementRef<HTMLElement>;
  @HostListener('window:resize') onResize() {
    this.style = this.wheel.update(this.events);
  }
  constructor(
    private readonly http: HttpClient,
    private readonly wheel: WheelService,
    private readonly scroll: ScrollService,
    private readonly element: ElementRef,
  ) {
    this.scroll.save('works', element.nativeElement);
  }

  ngOnInit(): void {
    this.http.get<{ events: Event[] }>(this.url).subscribe(({ events }) => {
      // this.events = events;
      // this.wheel.updateLength(events);

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

      this.style = this.wheel.update(this.events, this.main.nativeElement);
      // this.style = this.wheel.update(events);
    });
  }

  onWheel(el: HTMLElement, e: WheelEvent) {
    this.wheel.active(el, e);
    this.scrollCaptured.emit(e);
  }
}
