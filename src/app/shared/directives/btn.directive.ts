import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Palette } from '../types/palette.type';

@Directive({
  selector: 'button[btn]',
  standalone: true,
})
export class BtnDirective implements OnInit {
  @Input() outline: boolean | '' = false;
  @Input() color: Palette = 'pink-500';
  @Input() hover: Palette = 'light';

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    const button = this.element.nativeElement as HTMLButtonElement;
    const ico = Array.from(button.childNodes).find(
      (item) => (item as HTMLElement).tagName.toLowerCase() === 'i',
    ) as HTMLElement;

    if (this.outline || this.outline === '') {
      this.renderer.addClass(button, 'btn-directive-outline');

      this.add(button, 'border', this.color);
      this.add(button, 'color', this.color);

      this.add(ico, 'color', this.color);

      button.addEventListener('mouseenter', () => {
        if (window.innerWidth > 720) {
          this.remove(button, 'color', this.color);

          this.add(button, 'bg', this.color);
          this.add(button, 'color', this.hover);

          this.remove(ico, 'color', this.color);
          this.add(ico, 'color', this.hover);
        }
      });

      button.addEventListener('mouseleave', () => {
        if (window.innerWidth > 720) {
          this.remove(button, 'bg', this.color);
          this.remove(button, 'color', this.hover);

          this.add(button, 'color', this.color);

          this.remove(ico, 'color', this.hover);
          this.add(ico, 'color', this.color);
        }
      });
    } else this.renderer.addClass(button, 'btn-directive');
  }

  add(el: HTMLElement, style: string, value: Palette) {
    this.renderer.addClass(el, `${style}-${value}`);
  }
  remove(el: HTMLElement, style: string, value: Palette) {
    this.renderer.removeClass(el, `${style}-${value}`);
  }
}
