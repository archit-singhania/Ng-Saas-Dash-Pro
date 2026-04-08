import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Feature } from '../../core/models/feature.model';

@Component({
  selector: 'app-feature-card',
  imports: [TagModule],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss'
})
export class FeatureCard {
  @Input() feature!: Feature;

  get tagSeverity(): 'success' | 'warn' | 'secondary' {
    switch (this.feature?.status) {
      case 'live':        return 'success';
      case 'planned':     return 'warn';
      case 'coming-soon': return 'secondary';
      default:            return 'secondary';
    }
  }

  get statusLabel(): string {
    switch (this.feature?.status) {
      case 'live':        return 'Live';
      case 'planned':     return 'Planned';
      case 'coming-soon': return 'Coming Soon';
      default:            return '';
    }
  }
}
