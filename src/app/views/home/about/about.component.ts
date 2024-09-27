import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { BtnDropdownComponent } from '../../../shared/components/btn-dropdown/btn-dropdown.component';
import { ScrollService } from '../../../shared/services/scroll.service';

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

  width: number = window.innerWidth;
  aboutItems?: {
    title: string;
    context: string;
  }[];

  @HostListener('window:resize') onResize() {
    this.width = window.innerWidth;
  }
  constructor(
    private readonly http: HttpClient,
    private readonly scroll: ScrollService,
    private readonly element: ElementRef,
  ) {
    this.scroll.save('about', element.nativeElement);
  }

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
