import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {SimulationInterface} from '../model/simulation.interface';

import {SimulationService} from '../simulation.service';
import {ParameterValidator} from '../parameter.validator';
import {SimulationFormGroupErrorMatcher} from '../simulation.form.group.error.matcher';

@Component({
  selector: 'app-add-simulation',
  templateUrl: './add-simulation.component.html',
  styleUrls: ['./add-simulation.component.css']
})
export class AddSimulationComponent implements OnInit {

  allFG: FormGroup;
  simulationNameFC: FormControl;
  populationSizeFC: FormControl;
  initialNumberInfectedPeopleFC: FormControl;
  virusReproductionRateFC: FormControl;
  mortalityRateFC: FormControl;
  daysFromInfectionUntilRecoveryFC: FormControl;
  daysFromInfectionToDeathFC: FormControl;
  numberSimulationDaysFC: FormControl;
  errorMatcher = new SimulationFormGroupErrorMatcher('isError');

  constructor(
    private dialogRef: MatDialogRef<AddSimulationComponent>,
    private simulationService: SimulationService
  ) {
    this.simulationNameFC = new FormControl('', Validators.required);
    this.populationSizeFC = new FormControl('', [Validators.required, Validators.min(0)]);
    this.initialNumberInfectedPeopleFC = new FormControl('', [Validators.required, Validators.min(1)]);
    this.virusReproductionRateFC = new FormControl('', [Validators.required, Validators.min(0)]);
    this.mortalityRateFC = new FormControl('', [Validators.required, Validators.min(0)]);
    this.daysFromInfectionUntilRecoveryFC = new FormControl('', [Validators.required, Validators.min(1)]);
    this.daysFromInfectionToDeathFC = new FormControl('', [Validators.required, Validators.min(1)]);
    this.numberSimulationDaysFC = new FormControl('', [Validators.required, Validators.min(1)]);
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
    this.allFG.setValidators([ParameterValidator.isGreater(
      this.daysFromInfectionUntilRecoveryFC, this.daysFromInfectionToDeathFC),
      ParameterValidator.isMoralityRate(this.mortalityRateFC)]);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.simulationService.addSimulation(this.getData()).subscribe(
      () => this.dialogRef.close());
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
