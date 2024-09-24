import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { BtnDirective } from '../../directives/btn.directive';

@Component({
  selector: 'app-btn-dropdown',
  standalone: true,
  imports: [BtnDirective],
  templateUrl: './btn-dropdown.component.html',
  styleUrl: './btn-dropdown.component.scss',
})
export class BtnDropdownComponent implements OnInit {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) context!: string | string[];

  isOpen: boolean = false;
  isString!: boolean;

  index = 0;

  constructor(
    private readonly renderer: Renderer2,
    private readonly element: ElementRef,
  ) {}

  ngOnInit(): void {
    this.isString = typeof this.context === 'string';
    if (!this.isString)
      this.renderer.addClass(this.element.nativeElement, 'isArray');

    const element = this.element.nativeElement as HTMLElement;
    element.addEventListener('mouseleave', () => {
      if (this.isOpen) {
        const transition = element.style.transition;
        this.renderer.setStyle(element, 'transition', 'all .3s ease-in-out');

        this.close();

        setTimeout(() => {
          this.renderer.setStyle(element, 'transition', transition);
        }, 300);
      }
    });
  }

  onClick() {
    if (this.isOpen) this.close();
    else this.open();
  }

  private open() {
    this.isOpen = true;
    this.renderer.addClass(this.element.nativeElement, 'open');
  }

  private close() {
    this.isOpen = false;
    this.index = 0;
    this.renderer.removeClass(this.element.nativeElement, 'open');
  }

  controllerBack() {
    if (this.index !== 0) this.index--;
  }

  controllerNext() {
    if (!this.isString)
      if (this.index !== this.context.length - 1) this.index++;
  }
}
