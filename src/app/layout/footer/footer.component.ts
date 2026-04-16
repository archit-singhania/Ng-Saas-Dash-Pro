import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="app-footer">
      <span class="footer-copy">© {{ year }} Pre-Sales 360-AI Unified Customer Experience System</span>
      <span class="footer-version">v1.0.0</span>
    </footer>
  `,
  styles: [`
    .app-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      border-top: 1px solid var(--p-surface-200);
      font-size: .75rem;
      color: var(--p-text-muted-color);
    }
  `]
})
export class Footer {
  year = new Date().getFullYear();
}
