import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface AppSetting {
  key: string;
  value: string | boolean | number;
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  get(_key: string): Observable<AppSetting | null> {
    return of(null);
  }

  save(_setting: AppSetting): Observable<boolean> {
    return of(false);
  }
}
