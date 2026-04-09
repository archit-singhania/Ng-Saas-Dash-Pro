import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import type { ButtonSeverity } from 'primeng/button';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  template: `
    <p-button
      [label]="label"
      [icon]="icon"
      [disabled]="disabled"
      [loading]="loading"
      [severity]="severity"
      [size]="pSize"
      (onClick)="clicked.emit($event)"
    />
  `
})
export class AppButton {
  @Input() label = '';
  @Input() icon = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Output() clicked = new EventEmitter<MouseEvent>();

  get severity(): ButtonSeverity {
    const map: Record<ButtonVariant, ButtonSeverity> = {
      primary: 'primary', secondary: 'secondary', danger: 'danger', ghost: 'contrast'
    };
    return map[this.variant];
  }

  get pSize(): 'small' | 'large' | undefined {
    if (this.size === 'sm') return 'small';
    if (this.size === 'lg') return 'large';
    return undefined;
  }
}
