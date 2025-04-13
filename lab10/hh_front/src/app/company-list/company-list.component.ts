import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService, Company, Vacancy } from '../api.service';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Companies</h1>
      <div *ngIf="(companies$ | async)?.length; else loading">
        <div class="company-grid">
          <div
            *ngFor="let company of companies$ | async"
            class="company-card"
            (click)="showVacancies(company.id)"
          >
            <h2>{{ company.name }}</h2>
            <p>{{ company.city }}</p>
            <div class="stats">
              <span>🏢 {{ vacanciesCountMap[company.id] || 0 }} vacancies</span>
            </div>
          </div>
        </div>
      </div>
      <ng-template #loading>Loading companies...</ng-template>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .company-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
    .company-card { padding: 10px; border: 1px solid #ccc; cursor: pointer; border-radius: 6px; }
    .stats { margin-top: 5px; }
  `]
})
export class CompanyListComponent implements OnInit {
  companies$: Observable<Company[]>;
  vacanciesCountMap: Record<number, number> = {};

  constructor(private api: ApiService, private router: Router) {
    this.companies$ = this.api.getCompanies();
  }

  ngOnInit() {
    this.loadVacanciesCount();
  }

  loadVacanciesCount() {
    this.companies$.subscribe(companies => {
      const requests = companies.map(c =>
        this.api.getCompanyVacancies(c.id).pipe(map(vacs => ({ id: c.id, count: vacs.length })))
      );
      forkJoin(requests).subscribe(responses => {
        responses.forEach(r => this.vacanciesCountMap[r.id] = r.count);
      });
    });
  }

  showVacancies(companyId: number) {
    this.router.navigate(['/vacancies', companyId]);
  }
}
