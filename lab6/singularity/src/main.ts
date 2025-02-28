import { provideRouter } from '@angular/router';
import {HomeComponent} from './app/home/home.component';
import {AlbumsComponent} from './app/albums/albums.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {importProvidersFrom} from '@angular/core';
import {AboutComponent} from './app/about/about.component';
import {AppComponent} from './app/app.component';
import {HttpClientModule} from '@angular/common/http';
import { Route } from '@angular/router';
import {AlbumDetailComponent} from './app/album-detail/album-detail.component';
import {AlbumPhotosComponent} from './app/album-photos/album-photos.component';

const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'albums/:id', component: AlbumDetailComponent },
  { path: 'albums/:id/photos', component: AlbumPhotosComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes)
  ]
});
