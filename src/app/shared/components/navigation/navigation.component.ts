import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

import { RouteService } from '../../services/route.service';
import { ScrollService } from '../../services/scroll.service';
import { NavOptionComponent } from './nav-option/nav-option.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavOptionComponent, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  isHome: boolean = true;
  width = window.innerWidth;

  @HostListener('window:resize') onResize() {
    this.width = window.innerWidth;
  }
  constructor(
    private readonly router: Router,
    private readonly route: RouteService,
    private readonly renderer: Renderer2,
    private readonly element: ElementRef,
    private readonly scroll: ScrollService,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(({ url }) => {
        this.route.update(url);

        if (url === '/') this.isHome = true;
        else this.isHome = false;
      });

    const element = this.element.nativeElement as HTMLElement;
    element.addEventListener('click', () => {
      if (!this.__menu.mouseOver && this.__menu.public.isOpen) {
        this.btn.click();
      }
    });
  }

  private __menu = {
    mouseOver: false,
    open: () => {
      this.__menu.public.isOpen = true;
      this.renderer.addClass(this.element.nativeElement, 'open');
    },
    close: () => {
      this.__menu.public.isOpen = false;
      this.renderer.removeClass(this.element.nativeElement, 'open');
    },
    public: {
      isOpen: false,
      mouseenter: (): void => {
        this.__menu.mouseOver = true;
      },
      mouseleave: (): void => {
        this.__menu.mouseOver = false;
      },
    },
  };

  get menu() {
    return this.__menu.public;
  }

  btn = {
    click: () => {
      if (this.__menu.public.isOpen) this.__menu.close();
      else this.__menu.open();
    },
  };

  scrollTo(name: string, difference?: number) {
    if (typeof difference === 'number') return this.scroll.to(name, difference);

    if (this.width >= 720) {
      return this.scroll.to(name, -16 * 4.5);
    }

    return this.scroll.to(name, -16);
  }
}
