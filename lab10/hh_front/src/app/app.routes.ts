import { Routes } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import {VacancyListComponent} from './vacancy-list/vacancy-list.component';

export const routes: Routes = [
  { path: '', component: CompanyListComponent },
  { path: 'vacancies/:id', component: VacancyListComponent }
];
