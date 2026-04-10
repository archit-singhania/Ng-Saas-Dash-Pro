import { Directive, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  @Output() appClickOutside = new EventEmitter<void>();

  private el = inject(ElementRef<HTMLElement>);

  @HostListener('document:click', ['$event.target'])
  onClick(target: EventTarget | null): void {
    const nativeEl = this.el.nativeElement as HTMLElement;
    if (target && !nativeEl.contains(target as Node)) {
      this.appClickOutside.emit();
    }
  }
}
