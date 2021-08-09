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
  img_endpoint = 'https://www.artic.edu/iiif/2'

  getArtworks(search = '', page = 1, limit = 10): Observable<any> {
    return this.http.get(`${this.endpoint}/artworks/search?q=${search}&page=${page}&limit=${limit}`).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => throwError(err))
    );
  }

  getArtwork(api_link) {
    return this.http.get(`${api_link}`).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => throwError(err))
    );
  }

  getImage(id) {
    return this.http.get(`${this.img_endpoint}/${id}/full/843,/0/default.jpg`, { responseType: 'blob' }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => throwError(err))
    );
  }


  
}
