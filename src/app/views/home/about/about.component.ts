import { Component, HostListener, OnInit } from '@angular/core';

import { BtnDropdownComponent } from '../../../shared/components/btn-dropdown/btn-dropdown.component';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BtnDropdownComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  url = environment.base_url + 'about/about.json';
  about?: {
    mission: string;
    vision: string;
    values: string;
    history: string[];
  };

  innerWidth: number = window.innerWidth;
  aboutItems?: {
    title: string;
    context: string;
  }[];

  @HostListener('window:resize') onResize() {
    this.innerWidth = window.innerWidth;
  }
  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{
        about: {
          mission: string;
          vision: string;
          values: string;
          history: string[];
        };
      }>(this.url)
      .subscribe(({ about }) => {
        this.about = about;

        const { mission, vision, values } = about;
        this.aboutItems = [
          { title: 'missão', context: mission },
          { title: 'visão', context: vision },
          { title: 'valores', context: values },
        ];
      });
  }
}
