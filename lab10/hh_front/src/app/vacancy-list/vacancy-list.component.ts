import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import {map, switchMap} from 'rxjs';

@Component({
  selector: 'app-vacancy-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <h1>Vacancies</h1>
      <button routerLink="/">⬅ Back to Companies</button>

      <div class="vacancy-list">
        <div *ngFor="let vacancy of vacancies$ | async" class="vacancy-card">
          <div class="vacancy-header">
            <h2>{{ vacancy.name }}</h2>
            <span class="salary">{{ vacancy.salary | currency:'KZT':'symbol':'1.0-0' }}</span>
          </div>
          <p class="description">{{ vacancy.description }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 2rem; max-width: 800px; margin: 0 auto; }
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      margin-bottom: 2rem;
      cursor: pointer;
    }
    .vacancy-list { display: grid; gap: 1rem; }
    .vacancy-card {
      background: #fff;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .vacancy-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .salary {
      color: #28a745;
      font-weight: bold;
      font-size: 1.25rem;
    }
    .description {
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class VacancyListComponent {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  vacancies$ = this.route.params.pipe(
    map(params => params['id']),
    switchMap(companyId => this.api.getCompanyVacancies(companyId))
  );
}
