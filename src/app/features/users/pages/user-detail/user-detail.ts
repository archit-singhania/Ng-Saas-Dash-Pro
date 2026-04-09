import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-user-detail',
  imports: [TagModule],
  template: `
    <div class="coming-soon-wrap">
      <div class="cs-card">
        <i class="pi pi-user cs-icon"></i>
        <h2 class="cs-title">User Detail</h2>
        <p class="cs-desc">View and edit individual user profiles and permissions.</p>
        <p-tag value="Coming Soon" severity="secondary" />
      </div>
    </div>
  `
})
export class UserDetail {}
