import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { Colaborator } from '../../../shared/interfaces/colaborator.interface';
import { ColaboratorComponent } from './colaborator/colaborator.component';
import { ScrollService } from '../../../shared/services/scroll.service';

@Component({
  selector: 'app-colaborators',
  standalone: true,
  imports: [ColaboratorComponent],
  templateUrl: './colaborators.component.html',
  styleUrl: './colaborators.component.scss',
})
export class ColaboratorsComponent implements OnInit {
  url = environment.base_url + 'about/colaborators.json';
  colaborators!: Colaborator[];

  style: { container?: string; content?: string } = {};
  width = window.innerWidth;

  @HostListener('window:resize') onResize() {
    this.updateWidth(window.innerWidth);
  }
  constructor(
    private readonly http: HttpClient,
    private readonly scroll: ScrollService,
    private readonly element: ElementRef,
  ) {
    scroll.save('colaborators', element.nativeElement);
  }

  ngOnInit(): void {
    this.http
      .get<{ colaborators: Colaborator[] }>(this.url)
      .subscribe(({ colaborators }) => {
        this.colaborators = colaborators;

        this.updateWidth(window.innerWidth);
        const length = this.colaborators.length;
        this.style.content = `width: calc(100%/${length});`;
      });
  }

  updateWidth(width: number) {
    this.width = width;

    const rem = 16;
    const margin = width < 720 ? 2 * rem : 6 * rem;
    const itemWidth = width - margin - rem <= 360 ? width - margin - rem : 360;

    const length = this.colaborators.length;
    const style = itemWidth * length - rem;
    this.style.container = `min-width: ${style}px;`;
  }
}
