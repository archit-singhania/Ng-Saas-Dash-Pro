import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

export type StatTrend = 'up' | 'down' | 'neutral';

@Component({
  selector: 'app-stat-tile',
  imports: [CardModule, TagModule],
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
}
