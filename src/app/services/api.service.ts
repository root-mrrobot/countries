import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<any[]>(url).pipe(
      tap({
        next: (_) => {
          console.log(`Get All - Success`);
          console.log(_[0]);
        },
        error: (err) => {
          console.error(`Get All - Failed ${err}`);
        },
      })
    );
  }

  getCountryByName(name: string | null): Observable<any> {
    if (!name) {
      throw new Error('Name cannot be null');
    }
    const url = `${this.baseUrl}/name/${name}`;
    return this.http.get<any>(url).pipe(
      tap({
        next: (_) => {
          console.log(`get country by name - Success`);
          console.log(_);
        },
        error: (err) => {
          console.error(`get country by name - Failed ${err}`);
        },
      })
    );
  }
}
