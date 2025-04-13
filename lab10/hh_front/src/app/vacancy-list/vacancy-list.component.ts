import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Vacancy } from '../api.service';
import { CommonModule } from '@angular/common';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-vacancy-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})
export class VacancyListComponent {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  vacancies$ = this.route.params.pipe(
    map(params => params['id']),
    switchMap(companyId => this.api.getCompanyVacancies(companyId))
  );
}
