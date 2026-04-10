import { Injectable } from '@angular/core';
import { StatTrend } from '../../shared/components/stat-tile/stat-tile';

export interface KpiData {
  label: string;
  value: string | number;
  subtitle: string;
  icon: string;
  trend: StatTrend;
  trendLabel: string;
}

export interface CallRecord {
  date: string;
  phone: string;
  duration: string;
  status: 'Completed' | 'Missed' | 'In Progress';
}

@Injectable({ providedIn: 'root' })
export class StatsService {

  getKpis(): KpiData[] {
    return [
      {
        label: 'Total Calls',
        value: '—',
        subtitle: 'All time',
        icon: 'pi pi-phone',
        trend: 'neutral',
        trendLabel: 'No data yet'
      },
      {
        label: 'Bookings Made',
        value: '—',
        subtitle: 'Confirmed appointments',
        icon: 'pi pi-calendar-plus',
        trend: 'neutral',
        trendLabel: 'No data yet'
      },
      {
        label: 'Avg Duration',
        value: '—',
        subtitle: 'Seconds per call',
        icon: 'pi pi-clock',
        trend: 'neutral',
        trendLabel: 'No data yet'
      },
      {
        label: 'Booking Rate',
        value: '—',
        subtitle: 'Calls that converted',
        icon: 'pi pi-chart-line',
        trend: 'neutral',
        trendLabel: 'No data yet'
      }
    ];
  }

  getRecentCalls(): CallRecord[] {
    return [];
  }
}
