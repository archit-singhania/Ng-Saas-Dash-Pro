import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StatsService, CallRecord } from '../../core/services/stats';

@Component({
  selector: 'app-calls',
  imports: [TableModule, TagModule, ButtonModule, CardModule],
  templateUrl: './calls.html',
  styleUrl: './calls.scss'
})
export class Calls {
  private statsService = inject(StatsService);
  calls: CallRecord[] = this.statsService.getRecentCalls();

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'Completed':   return 'success';
      case 'Missed':      return 'danger';
      case 'In Progress': return 'warn';
      default:            return 'secondary';
    }
  }
}
