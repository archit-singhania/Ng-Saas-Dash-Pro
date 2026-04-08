import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface CallStats {
  totalCallsToday: number;
  resolvedByAI: number;
  escalatedToHuman: number;
  avgCallDurationSec: number;
  uptimePercent: number;
}

export interface RecentCall {
  id: string;
  callerNumber: string;
  startTime: string;
  durationSec: number;
  status: 'resolved' | 'escalated' | 'missed';
  sentiment: 'positive' | 'neutral' | 'negative' | 'unknown';
  summary: string;
}

@Injectable({ providedIn: 'root' })
export class StatsService {

  // TODO
  getTodayStats(): Observable<CallStats> {
    return of({
      totalCallsToday: 142,
      resolvedByAI: 119,
      escalatedToHuman: 18,
      avgCallDurationSec: 74,
      uptimePercent: 99.8
    });
  }

  // TODO
  getRecentCalls(): Observable<RecentCall[]> {
    return of([
      { id: 'C001', callerNumber: '+91-98765-00001', startTime: '2026-04-08T09:12:00', durationSec: 95, status: 'resolved', sentiment: 'positive', summary: 'Inquiry about business hours.' },
      { id: 'C002', callerNumber: '+91-98765-00002', startTime: '2026-04-08T09:28:00', durationSec: 43, status: 'resolved', sentiment: 'neutral', summary: 'Asked for pricing information.' },
      { id: 'C003', callerNumber: '+91-98765-00003', startTime: '2026-04-08T09:45:00', durationSec: 120, status: 'escalated', sentiment: 'negative', summary: 'Complaint about service — handed off to human.' },
      { id: 'C004', callerNumber: '+91-98765-00004', startTime: '2026-04-08T10:01:00', durationSec: 60, status: 'resolved', sentiment: 'positive', summary: 'Appointment booking confirmed.' },
      { id: 'C005', callerNumber: '+91-98765-00005', startTime: '2026-04-08T10:15:00', durationSec: 0, status: 'missed', sentiment: 'unknown', summary: 'Caller hung up before AI responded.' }
    ]);
  }
}
