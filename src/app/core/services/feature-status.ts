import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Feature, FeatureStatus, FeatureCategory } from '../models/feature.model';

@Injectable({ providedIn: 'root' })
export class FeatureStatusService {
  private http = inject(HttpClient);

  getAll(): Observable<Feature[]> {
    return this.http.get<Feature[]>('/data/features.json');
  }

  getByStatus(status: FeatureStatus): Observable<Feature[]> {
    return this.getAll().pipe(
      map(features => features.filter(f => f.status === status))
    );
  }

  getByCategory(category: FeatureCategory): Observable<Feature[]> {
    return this.getAll().pipe(
      map(features => features.filter(f => f.category === category))
    );
  }

  getSummary(): Observable<{ live: number; planned: number; comingSoon: number; total: number }> {
    return this.getAll().pipe(
      map(features => ({
        live: features.filter(f => f.status === 'live').length,
        planned: features.filter(f => f.status === 'planned').length,
        comingSoon: features.filter(f => f.status === 'coming-soon').length,
        total: features.length
      }))
    );
  }
}
