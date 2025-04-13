import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Company {
  id: number;
  name: string;
  description: string;
  city: string;
  address: string;
}

export interface Vacancy {
  id: number;
  name: string;
  description: string;
  salary: number;
  company: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}companies/`);
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}companies/${id}/`);
  }

  createCompany(data: Omit<Company, 'id'>): Observable<Company> {
    return this.http.post<Company>(`${this.apiUrl}companies/`, data);
  }

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.apiUrl}vacancies/`);
  }

  getCompanyVacancies(companyId: number): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(
      `${this.apiUrl}companies/${companyId}/vacancies/`
    );
  }

  getTopTenVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.apiUrl}vacancies/top_ten/`);
  }

  createVacancy(data: Omit<Vacancy, 'id'>): Observable<Vacancy> {
    return this.http.post<Vacancy>(`${this.apiUrl}vacancies/`, data);
  }
}
