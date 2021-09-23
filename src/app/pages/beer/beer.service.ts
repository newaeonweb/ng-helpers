import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Beer } from './beer.interface';
import { tap } from 'rxjs/operators';

export interface beerHttp {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  beersApiUrl = `${environment.apiURL}beers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Beer[]> {
    return this.http
      .get<Beer[]>(this.beersApiUrl);
  }

  getOne(id: number): Observable<Beer> {
    return this.http
      .get<Beer>(`${this.beersApiUrl}/${id}`)
      .pipe(tap(res => console.log(res)));
  }

  post(beer: Beer) {
    console.log(beer)
    return this.http
      .post(`${this.beersApiUrl}`, beer)
      .pipe(tap(res => console.log(res)));
  }
}
