import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

import { Planning } from '../models/planning';
import { CONFIG } from '../../utils/config';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

	planningsAPI = CONFIG.backend_url + 'planning';
  planningsByCode = CONFIG.backend_url + 'planningsByCodeStagiaire';

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

  createPlanning(planning: Planning): Observable<Planning> {
      return this.http.post<Planning>(this.planningsAPI, planning);
  }

  updatePlanning(planning: Planning) {
    return this.http.put(this.planningsAPI + '/' + planning.planning_id, planning);
  }

  deletePlanning(id: Number) {
    return this.http.delete(this.planningsAPI + '/' + id);
  }

  setSelectedPlanning(planning: Planning) {
    sessionStorage.setItem('selectedPlanning', JSON.stringify(planning));
  }
}
