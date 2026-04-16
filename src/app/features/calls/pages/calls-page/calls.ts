import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SkeletonModule } from 'primeng/skeleton';
import { CallApiService, CallRow } from '../../../../core/services/call-api.service';

@Component({
  selector: 'app-calls',
  imports: [
    FormsModule, SlicePipe,
    TableModule, ButtonModule, CardModule,
    TagModule, ProgressBarModule, TooltipModule,
    InputTextModule, IconFieldModule, InputIconModule,
    SkeletonModule,
  ],
  templateUrl: './calls.html',
  styleUrl: './calls.scss'
})
export class Calls implements OnInit {
  private callApi = inject(CallApiService);

  calls       = signal<CallRow[]>([]);
  total       = signal(0);
  page        = signal(1);
  limit       = signal(15);
  loading     = signal(true);
  searchTerm  = signal('');

  skeletonRows = Array(8);

  filteredCalls = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.calls();
    return this.calls().filter(c =>
      (c.callerName  ?? '').toLowerCase().includes(term) ||
      (c.phone       ?? '').toLowerCase().includes(term) ||
      (c.aiSummary   ?? '').toLowerCase().includes(term) ||
      (c.leadClassification ?? '').toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void {
    this.loading.set(true);
    this.callApi.getCalls(this.page(), this.limit()).subscribe({
      next: res => {
        this.calls.set(res.data);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onPageChange(event: { first: number; rows: number }): void {
    this.limit.set(event.rows);
    this.page.set(Math.floor(event.first / event.rows) + 1);
    this.loadPage();
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
  }

  clearSearch(): void {
    this.searchTerm.set('');
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

  getLeadType(rate: number | null): string {
    if (rate === null || rate === undefined) return 'Dead';
    if (rate >= 8) return 'Hot';
    if (rate > 5)  return 'Warm';
    if (rate >= 4) return 'Cold';
    return 'Dead';
  }

  getLeadSeverity(lead: string | null): 'danger' | 'warn' | 'info' | 'secondary' {
    if (!lead) return 'secondary';
    switch (lead.toLowerCase()) {
      case 'hot':  return 'danger';
      case 'warm': return 'warn';
      case 'cold': return 'info';
      case 'dead': return 'secondary';
      default:     return 'secondary';
    }
  }

  getLeadIcon(lead: string | null): string {
    if (!lead) return 'pi pi-minus';
    switch (lead.toLowerCase()) {
      case 'hot':  return 'pi pi-bolt';
      case 'warm': return 'pi pi-sun';
      case 'cold': return 'pi pi-snowflake';
      case 'dead': return 'pi pi-ban';
      default:     return 'pi pi-ban';
    }
  }

  getRateSeverity(displayRate: number): 'success' | 'warn' | 'danger' {
    if (displayRate >= 70) return 'success';
    if (displayRate >= 40) return 'warn';
    return 'danger';
  }
}
