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
  plannings: any;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

  constructor(private http: HttpClient) {
    this.plannings = this.getPlannings;
  }

  getPlannings(): Observable<Planning[]> {
    return this.http.get<Planning[]>(this.planningsAPI);
  }

  getPlanningsByStagiaire(codeStagiaire:number):Observable<Planning> {
    return of(this.plannings.find(planning => planning.CodeStagiaire === codeStagiaire));
  }

  createPlanning(planning: Planning) {
    // console.log(this.planningsAPI);
    return this.http.post(this.planningsAPI, planning).subscribe(
        data => {
            console.log(data);
        },
        error => {
            console.log(error);
        }
    );
  }

  updatePlanning(planning: Planning) {
    return this.http.put(this.planningsAPI + '/' + planning.planning_id, planning);
  }

  deletePlanning(id: number) {
    return this.http.delete(this.planningsAPI + '/' + id);
  }
}
