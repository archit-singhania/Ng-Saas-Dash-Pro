import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-user-list',
  imports: [TagModule],
  template: `
    <div class="coming-soon-wrap">
      <div class="cs-card">
        <i class="pi pi-users cs-icon"></i>
        <h2 class="cs-title">User Management</h2>
        <p class="cs-desc">Manage team members, roles and access levels.</p>
        <p-tag value="Coming Soon" severity="secondary" />
      </div>
    </div>
  `
})
export class UserList {}
