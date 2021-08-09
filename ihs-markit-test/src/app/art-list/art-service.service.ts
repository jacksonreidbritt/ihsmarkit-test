import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtServiceService {

  constructor(private http: HttpClient) { }

  endpoint = 'https://api.artic.edu/api/v1'

  getArtworks(search = '', page = 1, limit = 10): Observable<any> {
    return this.http.get(`${this.endpoint}/artworks/search?q=${search}&page=${page}&limit=${limit}`).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => throwError(err))
    );
  }
}
