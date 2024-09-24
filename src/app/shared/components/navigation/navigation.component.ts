import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

import { RouteService } from '../../services/route.service';
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

  menu = {
    status: false,
    mouse: false,
  };

  constructor(
    private readonly router: Router,
    private readonly route: RouteService,
    private readonly renderer: Renderer2,
    private readonly element: ElementRef,
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
      if (!this.menu.mouse && this.menu.status) {
        this.onClick();
      }
    });
  }

  onClick() {
    this.menu.status = !this.menu.status;

    if (this.menu.status)
      this.renderer.addClass(this.element.nativeElement, 'open');
    else this.renderer.removeClass(this.element.nativeElement, 'open');
  }

  onMouseEnter() {
    this.menu.mouse = true;
  }

  onMouseLeave() {
    this.menu.mouse = false;
  }
}
