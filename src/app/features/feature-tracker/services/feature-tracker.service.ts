import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feature } from '../../../shared/models/feature.model';

@Injectable({ providedIn: 'root' })
export class FeatureTrackerService {
  getAll(): Observable<Feature[]> {
    return of([]);
  }
}
