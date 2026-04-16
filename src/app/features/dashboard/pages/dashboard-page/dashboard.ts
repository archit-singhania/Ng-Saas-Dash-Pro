import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatTile } from '../../../../shared/components/stat-tile/stat-tile';
import { CallApiService, CallRow, CallSummary } from '../../../../core/services/call-api.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink, StatTile,
    TableModule, ButtonModule, CardModule,
    SkeletonModule, TagModule, ProgressBarModule, TooltipModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private callApi = inject(CallApiService);

  summary    = signal<CallSummary | null>(null);
  recent     = signal<CallRow[]>([]);
  loading    = signal(true);
  refreshing = signal(false);

  skeletonRows = Array(5);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.callApi.getSummary().subscribe({
      next:  s  => this.summary.set(s),
      error: () => this.summary.set({ totalCalls: 0, avgDuration: '—' })
    });

    this.callApi.getRecent().subscribe({
      next:  rows => { this.recent.set(rows); this.loading.set(false); this.refreshing.set(false); },
      error: ()   => { this.loading.set(false); this.refreshing.set(false); }
    });
  }

  refresh(): void {
    this.refreshing.set(true);
    this.loadData();
  }

  getResultSeverity(val: boolean | null): 'success' | 'danger' | 'secondary' {
    if (val === true)  return 'success';
    if (val === false) return 'danger';
    return 'secondary';
  }

  getResultLabel(val: boolean | null): string {
    if (val === true)  return 'Success';
    if (val === false) return 'Failed';
    return '—';
  }

  getRateSeverity(displayRate: number): 'success' | 'warn' | 'danger' {
    if (displayRate >= 70) return 'success';
    if (displayRate >= 40) return 'warn';
    return 'danger';
  }
}
