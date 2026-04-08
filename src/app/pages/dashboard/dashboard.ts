import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatTile } from '../../shared/stat-tile/stat-tile';
import { StatsService } from '../../core/services/stats';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, StatTile, TableModule, TagModule, ButtonModule, CardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private statsService = inject(StatsService);

  kpis = this.statsService.getKpis();
  recentCalls = this.statsService.getRecentCalls();

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'Completed':   return 'success';
      case 'Missed':      return 'danger';
      case 'In Progress': return 'warn';
      default:            return 'secondary';
    }
  }
}
