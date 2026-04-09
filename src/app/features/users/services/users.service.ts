import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  region: string;
  plan: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  getAll(): Observable<UserProfile[]> {
    return of([]);
  }

  getById(_id: string): Observable<UserProfile | null> {
    return of(null);
  }
}
