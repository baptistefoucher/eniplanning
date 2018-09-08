import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Planning } from '../models/planning';
import { CONFIG } from '../../utils/config';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

	planningsAPI = CONFIG.backend_url + 'planning';
  planningsByCode = CONFIG.backend_url + 'planningsByCodeStagiaire';
  selectedPlanning = new BehaviorSubject<Planning>(null);
  newPlanning = new BehaviorSubject<Planning>(null);
  updatePlanningsList = new BehaviorSubject(null);
  openModalUpdatePlanning = new BehaviorSubject<Array<any>>(null);

  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {
  }

  getPlanningsByStagiaire(codeStagiaire: Number): Observable<Planning[]> {
    return this.http.get<Planning[]>(this.planningsByCode + '/' + codeStagiaire);
  }

  getPlanningsById(idPlanning: Number): Observable<Planning> {
    return this.http.get<Planning>(this.planningsAPI + '/' + idPlanning);
  }

  createPlanning(planning: Planning): Observable<Planning> {
      return this.http.post<Planning>(this.planningsAPI, planning);
  }

  updatePlanning(planning: Planning) {
    return this.http.put(this.planningsAPI + '/' + planning.planning_id, planning);
  }

  deletePlanning(planning: Planning) {
    return this.http.delete(this.planningsAPI + '/' + planning.id);
  }

  setSelectedPlanning(planning: Planning) {
    this.clearCoursOnPage();
    this.selectedPlanning.next(planning);
    sessionStorage.setItem('selectedPlanning', JSON.stringify(planning));
  }

  //Clear cours on web page from previous planning
  clearCoursOnPage() {
    let c = document.getElementsByClassName('green-bg');
    while (c[0]) {
        c[0].classList.remove('green-bg')
    }
  }
}
