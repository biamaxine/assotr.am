import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

import { NavOptionComponent } from './nav-option/nav-option.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavOptionComponent, RouterModule ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  isOpen: boolean = false;
  isHome: boolean = true;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ url }) => {
        if (url === '/') this.isHome = true;
        else this.isHome = false;
      });
  }
}
