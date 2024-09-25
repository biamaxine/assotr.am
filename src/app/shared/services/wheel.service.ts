import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WheelService {
  private movement: number = 0;
  private left: number = 0;
  private timeout: any;

  private element!: HTMLElement;

  update(
    { length }: any[],
    element?: HTMLElement,
  ): { container: string; content: string } {
    const width = window.innerWidth;

    const rem = 16;
    const margin = width < 720 ? 2 * rem : 6 * rem;
    const workWidth = width - margin - rem <= 360 ? width - margin - rem : 360;

    if (element) this.element = element;

    return {
      container: `width: calc(${workWidth}px * ${length} - 1rem);`,
      content: `width: calc(100%/${length});`,
    };
  }

  active(el: HTMLElement, e: WheelEvent) {
    if (
      !(e.deltaY < 0 && el.scrollLeft === 0) &&
      !(e.deltaY > 0 && el.scrollLeft === el.scrollWidth - el.clientWidth)
    ) {
      this.setScrollLeft(el, e);
    }
  }

  private setScrollLeft(el: HTMLElement, e: WheelEvent) {
    this.movement += e.deltaY;

    const item = (el.firstChild?.firstChild as HTMLElement).clientWidth;

    const movement = this.getMultipleOf(this.movement, item + this.rem);
    const left = this.getMultipleOf(el.scrollLeft + movement, item + this.rem);
    this.updateLeft(left);

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      el.scrollTo({
        behavior: 'smooth',
        left:
          this.getMultipleOf((el.scrollLeft += movement), item + this.rem) -
          (window.innerWidth < 720 ? this.rem : 2 * this.rem),
      });

      this.movement = 0;
    }, 50);

    e.preventDefault();
  }

  private getMultipleOf(num: number, multipleOf: number) {
    const division = Math.round(num / multipleOf);
    return division * multipleOf;
  }

  private updateLeft(left: number) {
    const { scrollWidth, clientWidth } = this.element;
    if (left > 0) {
      if (left <= scrollWidth - clientWidth) {
        this.left = left;
      } else {
        this.left = scrollWidth - clientWidth;
      }
    }
  }

  get rem() {
    return window.innerWidth < 720 ? 16 : 24;
  }
}
