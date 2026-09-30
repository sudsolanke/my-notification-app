import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltipDirective]',
})
export class TooltipDirective {

  @Input('appTooltipDirective') tooltipText: string = '';
  private tooltipEl: HTMLElement | null = null;
  el = inject(ElementRef<HTMLElement>);
  renderer = inject(Renderer2);

  @HostListener('mouseenter')
  onMouseEnter() {
    const host = this.el.nativeElement

    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'tooltip');
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltipEl, text);
    this.renderer.appendChild(document.body, this.tooltipEl);

    const hostRect = host.getBoundingClientRect();

    this.renderer.setStyle(this.tooltipEl, 'position', 'fixed');
    this.renderer.setStyle(this.tooltipEl, 'top', `${hostRect.top - 32}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${hostRect.left}px`);

  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.removeTooltip();
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }

  private removeTooltip(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }

}
