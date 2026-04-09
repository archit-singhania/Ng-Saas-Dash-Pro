import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, ProgressSpinnerModule],
  template: `
    @if (visible) {
      <div class="loader-wrap">
        <p-progress-spinner strokeWidth="4" [style]="{ width: size, height: size }" />
        @if (message) {
          <span class="loader-msg">{{ message }}</span>
        }
      </div>
    }
  `,
  styles: [`
    .loader-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 32px;
    }
    .loader-msg {
      font-size: .875rem;
      color: var(--p-text-muted-color);
    }
  `]
})
export class AppLoader {
  @Input() visible = true;
  @Input() message = '';
  @Input() size = '40px';
}
