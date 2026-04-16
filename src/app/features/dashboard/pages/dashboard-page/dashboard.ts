import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatTile } from '../../../../shared/components/stat-tile/stat-tile';
import { CallApiService, CallRow, CallSummary } from '../../../../core/services/call-api.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, StatTile, TableModule, ButtonModule, CardModule, SkeletonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private callApi = inject(CallApiService);

  summary  = signal<CallSummary | null>(null);
  recent   = signal<CallRow[]>([]);
  loading  = signal(true);

  ngOnInit(): void {
    this.callApi.getSummary().subscribe({
      next:  s  => this.summary.set(s),
      error: () => this.summary.set({ totalCalls: 0, avgDuration: '—' })
    });

    this.callApi.getRecent().subscribe({
      next:  rows => { this.recent.set(rows); this.loading.set(false); },
      error: ()   => this.loading.set(false)
    });
  }

  getRatePillClass(rate: number): string {
    if (rate >= 70) return 'rate-green';
    if (rate >= 40) return 'rate-yellow';
    return 'rate-red';
  }
}
