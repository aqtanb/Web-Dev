import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ApiService, Company } from '../api.service';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies$: Observable<Company[]>;
  vacanciesCountMap: Record<number, number> = {};

  constructor(private api: ApiService, private router: Router) {
    this.companies$ = this.api.getCompanies();
  }

  ngOnInit(): void {
    this.loadVacanciesCount();
  }

  private loadVacanciesCount(): void {
    this.companies$
      .pipe(
        switchMap(companies =>
          forkJoin(
            companies.map(company =>
              this.api.getCompanyVacancies(company.id).pipe(
                map(vacancies => ({ id: company.id, count: vacancies.length }))
              )
            )
          )
        )
      )
      .subscribe(results => {
        results.forEach(({ id, count }) => this.vacanciesCountMap[id] = count);
      });
  }

  showVacancies(companyId: number): void {
    this.router.navigate(['/vacancies', companyId]);
  }

  getVacanciesCount(companyId: number): number {
    return this.vacanciesCountMap[companyId] || 0;
  }
}
