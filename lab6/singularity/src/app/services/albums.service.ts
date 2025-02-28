import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getAlbum(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateAlbum(id: number, newTitle: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, {
      title: newTitle
    });
  }

  deleteAlbum(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getPhotos(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/photos`);
  }
}
