import { Injectable } from '@angular/core';
import {SimulationInterface} from './model/simulation.interface';
import {SimulationStepInterface} from './model/simulation.step.interface';


@Injectable({
  providedIn: 'root'
})
export class CharService {

  constructor() { }

  getDaySimulation(data: SimulationStepInterface[]): string[] {
    return data.map( d => d.daySimulation.toString());
  }

  getInfectedPeople(data: SimulationStepInterface[]): number[] {
    return data.map( d => d.infectedPeople);
  }

  getHealthyPeople(data: SimulationStepInterface[]): number[] {
    return data.map( d => d.healthyPeople);
  }

  getDiedPeople(data: SimulationStepInterface[]): number[] {
    return data.map( d => d.diedPeople);
  }

  getRecoveredPeople(data: SimulationStepInterface[]): number[] {
    return data.map( d => d.recoveredPeople);
  }
}
