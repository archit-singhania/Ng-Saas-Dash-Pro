import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CallRecord } from '../../../core/services/stats';

export interface CallFilters {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class CallsService {
  getCalls(_filters?: CallFilters): Observable<CallRecord[]> {
    return of([]);
  }

  exportCsv(_filters?: CallFilters): void {
  }
}
