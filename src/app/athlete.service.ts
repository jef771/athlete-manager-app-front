import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Athlete } from './athlete';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  private apiServerurl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAthletes(): Observable<Athlete[]> {
    return this.http.get<Athlete[]>(`${this.apiServerurl}/athletes/all`);
  }

  public addAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http.post<Athlete>(`${this.apiServerurl}/athletes/add`, athlete);
  }

  public updateAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http.put<Athlete>(`${this.apiServerurl}/athletes/update/${athlete.athleteId}`, athlete);
  }

  public deleteAthlete(athleteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerurl}/athletes/delete/${athleteId}`);
  }
}
