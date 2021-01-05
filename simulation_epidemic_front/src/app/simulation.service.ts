import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {SimulationInterface} from './model/simulation.interface';

import {HttpClient, HttpParams} from '@angular/common/http';
import {SimulationStepInterface} from './model/simulation.step.interface';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  private simulationsUrl = '/api/simulations';
  constructor(
    private http: HttpClient
  ) {}

  getSimulations(): Observable<SimulationInterface[]> {
    return this.http.get<SimulationInterface[]>(this.simulationsUrl + '/all');
  }

  getSimulation(id: number): Observable<SimulationInterface> {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.get<SimulationInterface>(this.simulationsUrl , {params});
  }

  addSimulation(simulation: SimulationInterface): Observable<void> {
    return this.http.post<void>(this.simulationsUrl, simulation);
  }

  removeSimulation(id: number): Observable<{}> {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.delete(this.simulationsUrl, {params});
  }

  updateSimulation(simulation: SimulationInterface): Observable<void> {
    return this.http.put<void>(this.simulationsUrl, simulation);
  }

  getSimulationSteps(id: number): Observable<SimulationStepInterface[]> {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.get<SimulationStepInterface[]>(this.simulationsUrl + '/steps', {params});
  }
}
