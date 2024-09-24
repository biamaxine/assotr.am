import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { Event } from '../../interfaces/event.interface';
import { RouteService } from '../../services/route.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-cover',
  standalone: true,
  imports: [RouterModule, LogoComponent],
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.scss',
})
export class CoverComponent implements OnChanges, OnInit {
  @Input() event?: Event;
  isHome!: boolean;

  interval: any;
  index = 0;

  @ViewChild('header', { static: false }) header?: ElementRef<HTMLElement>;
  constructor(
    private readonly route: RouteService,
    private readonly renderer: Renderer2,
    private readonly element: ElementRef,
  ) {}

  ngOnInit(): void {
    if (this.route.url === '/') this.isHome = true;
    else this.isHome = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.event) {
      this.renderer.addClass(this.element.nativeElement, 'not-home');

      if (this.header) {
        let cont = 0;

        this.renderer.setStyle(
          this.header.nativeElement,
          'background-image',
          `url('${this.event.pictures[cont]}')`,
        );

        this.interval = setInterval(() => {
          if (this.event && this.header) {
            cont++;
            if (cont === this.event.pictures.length) {
              cont = 0;
            }

            this.index = cont;

            this.renderer.setStyle(
              this.header.nativeElement,
              'background-image',
              `url('${this.event.pictures[cont]}')`,
            );
          }
        }, 5000);
      }
    } else {
      const id = this.route.getId();
      if (!id || id === '' || Number.isNaN(+id))
        this.renderer.addClass(this.element.nativeElement, 'error-404');
    }
  }
}
