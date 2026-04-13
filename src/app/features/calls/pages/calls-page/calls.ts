import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CallApiService, CallRow } from '../../../../core/services/call-api.service';

@Component({
  selector: 'app-calls',
  imports: [TableModule, ButtonModule, CardModule],
  templateUrl: './calls.html',
  styleUrl: './calls.scss'
})
export class Calls implements OnInit {
  private callApi = inject(CallApiService);

  calls   = signal<CallRow[]>([]);
  total   = signal(0);
  page    = signal(1);
  limit   = signal(15);
  loading = signal(true);

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
}
