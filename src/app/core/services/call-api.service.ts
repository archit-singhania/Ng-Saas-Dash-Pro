import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CallRow {
  id:                  number;
  phone:               string;
  callerName:          string;
  duration:            string;
  date:                string;
  transcript:          string | null;
  recordingUrl:        string | null;
  aiSummary:           string | null;
  successEvaluation:   boolean | null;
  successRate:         number | null;
  leadClassification:  string | null;
}

export interface CallsResponse {
  data:  CallRow[];
  total: number;
  page:  number;
  limit: number;
}

export interface CallSummary {
  totalCalls:  number;
  avgDuration: string;
}

@Injectable({ providedIn: 'root' })
export class CallApiService {
  private http = inject(HttpClient);
  private base = `${environment.apiBase}/calls`;

  getSummary(): Observable<CallSummary> {
    return this.http.get<CallSummary>(`${this.base}/summary`);
  }

  getRecent(): Observable<CallRow[]> {
    return this.http.get<CallRow[]>(`${this.base}/recent`);
  }

  getCalls(page = 1, limit = 15): Observable<CallsResponse> {
    const params = new HttpParams()
      .set('page',  page.toString())
      .set('limit', limit.toString());
    return this.http.get<CallsResponse>(this.base, { params });
  }
}
