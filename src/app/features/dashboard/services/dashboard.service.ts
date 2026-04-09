import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KpiData, CallRecord } from '../../../core/services/stats';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getKpis(): Observable<KpiData[]> {
    return of([]);
  }

  getRecentCalls(): Observable<CallRecord[]> {
    return of([]);
  }
}
