import { Component, Input } from '@angular/core';

export type StatTrend = 'up' | 'down' | 'neutral';

@Component({
  selector: 'app-stat-tile',
  imports: [],
  templateUrl: './stat-tile.html',
  styleUrl: './stat-tile.scss'
})
export class StatTile {
  @Input() value: string | number = '—';
  @Input() label = '';
  @Input() subtitle = '';
  @Input() icon = 'pi pi-chart-bar';
  @Input() trend: StatTrend = 'neutral';
  @Input() trendLabel = '';
  @Input() accentColor = 'var(--p-primary-500)';
}
