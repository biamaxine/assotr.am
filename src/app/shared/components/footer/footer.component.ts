import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { Contact } from '../../interfaces/contact.interface';
import { IcoComponent } from '../ico/ico.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent, IcoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  url = environment.base_url + 'about/about.json';
  contacts: Contact[] = [];
  address!: string;

  constructor(
    private readonly http: HttpClient,
    private readonly renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.http
      .get<{
        info: {
          contacts: Contact[];
          address: string[];
        };
      }>(this.url)
      .subscribe(({ info }) => {
        this.contacts = info.contacts;
        const [street, num, district, city, state, cep] = info.address;
        this.address = `${street}, ${num}<br>${district}<br>${city}/${state}<br>${cep}`;
      });
  }

  getAccount(url: string) {
    const www = 'https://www.';
    if (url.includes(www)) return url.replace('https://www.', '');
    return url;
  }

  onMouseEnter(div: HTMLElement) {
    const appIco = div.firstChild as HTMLElement;
    this.renderer.removeClass(appIco, 'fill-light');
    this.renderer.addClass(appIco, 'fill-dark');
  }

  onMouseLeave(div: HTMLElement) {
    const appIco = div.firstChild as HTMLElement;
    this.renderer.removeClass(appIco, 'fill-dark');
    this.renderer.addClass(appIco, 'fill-light');
  }
}
