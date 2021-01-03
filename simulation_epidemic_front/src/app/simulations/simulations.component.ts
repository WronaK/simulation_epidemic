import {Component, OnInit} from '@angular/core';
import {SimulationInterface} from '../model/simulation.interface';
import {SimulationService} from '../simulation.service';
import {Router} from '@angular/router';

import {switchMap, tap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html',
  styleUrls: ['./simulations.component.css']
})
export class SimulationsComponent implements OnInit {
  simulations: SimulationInterface[] = [];
  selectedSimulation: SimulationInterface | undefined;

  headElements = ['id', 'simulationName', 'populationSize',
    'initialInfectedPeople', 'virusReproductionRate',
    'mortalityRate', 'daysFromInfectionUntilRecovery',
    'daysFromInfectionToDeath', 'simulationDays'];

  allFG: FormGroup;
  simulationNameFC: FormControl;
  populationSizeFC: FormControl;
  initialNumberInfectedPeopleFC: FormControl;
  virusReproductionRateFC: FormControl;
  mortalityRateFC: FormControl;
  daysFromInfectionUntilRecoveryFC: FormControl;
  daysFromInfectionToDeathFC: FormControl;
  numberSimulationDaysFC: FormControl;

  constructor(
    private simulationService: SimulationService,
    private router: Router) {
    this.simulationNameFC = new FormControl('', Validators.required);
    this.populationSizeFC = new FormControl('', Validators.required);
    this.initialNumberInfectedPeopleFC = new FormControl('', Validators.required);
    this.virusReproductionRateFC = new FormControl('', Validators.required);
    this.mortalityRateFC = new FormControl('', Validators.required);
    this.daysFromInfectionUntilRecoveryFC = new FormControl('', Validators.required);
    this.daysFromInfectionToDeathFC = new FormControl('', Validators.required);
    this.numberSimulationDaysFC = new FormControl('', Validators.required);
    this.allFG = new FormGroup({
      nameFC: this.simulationNameFC,
      populationSizeFC: this.populationSizeFC,
      initialNumberInfectedPeopleFC: this.initialNumberInfectedPeopleFC,
      virusReproductionRateFC: this.virusReproductionRateFC,
      mortalityRateFC: this.mortalityRateFC,
      daysFromInfectionUntilRecoveryFC: this.daysFromInfectionUntilRecoveryFC,
      daysFromInfectionToDeathFC: this.daysFromInfectionToDeathFC,
      numberSimulationDaysFC: this.numberSimulationDaysFC,
    });
  }

  ngOnInit(): void {
    this.getSimulations();
  }

  getSimulations(): void {
    this.simulationService.getSimulations().pipe(
      tap((simulations => this.simulations = simulations)))
      .subscribe();
  }

  onSelect(simulation: SimulationInterface): void {
    this.selectedSimulation = simulation;
  }

  goToSimulation(): void {
    this.router.navigate(['simulation/' + this.selectedSimulation?.id]);
  }

  addSimulation(): void {
    this.simulationService.addSimulation(this.getData()).pipe(
      switchMap(() => this.simulationService.getSimulations()),
      tap((simulations => this.simulations = simulations))
    ).subscribe();
  }

  removeSimulation(): void {
    if (this.selectedSimulation) {
      this.simulationService.removeSimulation(this.selectedSimulation.id).pipe(
        switchMap(() => this.simulationService.getSimulations()),
        tap((simulations => this.simulations = simulations))
      ).subscribe();
    }
  }

  getData(): SimulationInterface {
    return {
      simulationName: this.simulationNameFC.value,
      populationSize: this.populationSizeFC.value,
      initialInfectedPeople: this.initialNumberInfectedPeopleFC.value,
      virusReproductionRate: this.virusReproductionRateFC.value,
      mortalityRate: this.mortalityRateFC.value,
      daysFromInfectionUntilRecovery: this.daysFromInfectionUntilRecoveryFC.value,
      daysFromInfectionToDeath: this.daysFromInfectionToDeathFC.value,
      simulationDays: this.numberSimulationDaysFC.value,
    } as SimulationInterface;
  }
}
