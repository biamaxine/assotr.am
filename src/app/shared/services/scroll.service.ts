import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private elements: any = {};

  save(name: string, element: HTMLElement) {
    this.elements[name] = element;
  }

  to(name: string, difference: number = 0) {
    const behavior = 'smooth';

    if (name === '') return window.scrollTo({ behavior, top: 0 });

    const { offsetTop } = this.elements[name] as HTMLElement;
    const top = offsetTop + difference;
    window.scrollTo({ behavior: 'smooth', top });
  }
}
