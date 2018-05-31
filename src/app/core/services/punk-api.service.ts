import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
}

@Injectable()
export class PunkApiService {

  private readonly BASE_URL = 'https://api.punkapi.com/v2';

  constructor(
    private http: HttpClient,
  ) { }

  fetch({
      page,
      perPage = 20,
      beerName = '',
    }: {
      page: number,
      perPage?: number
      beerName?: string,
    }): Observable<Beer[]> {
      let uri = `${this.BASE_URL}/beers?page=${page}&per_page=${perPage}`;
      if (beerName.length) {
        uri += `&beer_name=${beerName}`;
      }
      return this.http.get(uri).pipe(
        map((response) => <Beer[]>response)
    );
  }

  getBeer(id: string): Observable<Beer> {
    return this.http.get(`${this.BASE_URL}/beers/${id}`).pipe(
      map((response) => <Beer>response[0])
    );
  }
}
