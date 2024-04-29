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
          // console.log(_[0]);
        },
        error: (err) => {
          console.error(`Get All - Failed ${err}`);
        },
      })
    );
  }

  public getCountryByCode(codeCca3: string): Observable<any> {
    const url = `${this.baseUrl}/alpha/${codeCca3}`;
    console.log(url);
    return this.http.get<any>(url).pipe(
      tap({
        next: (_) => {
          console.log(`Get Country by Code cca3 - Success`);
        },
        error: (err) => {
          console.error(`Get Country by Code cca3 - Failed ${err}`);
        },
      })
    );
  }
}
