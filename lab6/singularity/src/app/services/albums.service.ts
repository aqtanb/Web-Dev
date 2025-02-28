import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/albums';
  private albumsStore = new BehaviorSubject<any[]>([]);
  albums$ = this.albumsStore.asObservable();

  constructor(private http: HttpClient) {
    this.http.get<any[]>(this.baseUrl).subscribe(albums => {
      this.albumsStore.next(albums); // Initialize store
    });
  }

  updateAlbum(id: number, newTitle: string): Observable<any> {
    const updatedAlbums = this.albumsStore.value.map(album =>
      album.id === id ? { ...album, title: newTitle } : album
    );
    this.albumsStore.next(updatedAlbums);

    return this.http.put<any>(`${this.baseUrl}/${id}`, { title: newTitle }).pipe(
      tap({
        error: (err) => {
          const originalAlbums = this.albumsStore.value.map(album =>
            album.id === id ? { ...album, title: this.findOriginalTitle(id) } : album
          );
          this.albumsStore.next(originalAlbums);
        }
      })
    );
  }

  private findOriginalTitle(id: number): string {
    const album = this.albumsStore.value.find(a => a.id === id);
    return album?.title || '';
  }

  getAlbum(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  deleteAlbum(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getPhotos(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/photos`);
  }
}
