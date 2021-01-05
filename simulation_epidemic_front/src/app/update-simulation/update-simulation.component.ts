import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SimulationService} from '../simulation.service';
import {SimulationInterface} from '../model/simulation.interface';
import {ActivatedRoute} from '@angular/router';
import {Inject} from '@angular/core';
import {ParameterValidator} from '../parameter.validator';
import {SimulationFormGroupErrorMatcher} from '../simulation.form.group.error.matcher';

@Component({
  selector: 'app-update-simulation',
  templateUrl: './update-simulation.component.html',
  styleUrls: ['./update-simulation.component.css']
})
export class UpdateSimulationComponent implements OnInit {

  id!: number;
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
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<UpdateSimulationComponent>,
    private simulationService: SimulationService,
    @Inject(MAT_DIALOG_DATA) data: SimulationInterface
  ) {
    this.simulationNameFC = new FormControl('', Validators.required);
    this.populationSizeFC = new FormControl('', [Validators.required, Validators.min(0)]);
    this.initialNumberInfectedPeopleFC = new FormControl('', [Validators.required, Validators.min(1)]);
    this.virusReproductionRateFC = new FormControl('', [Validators.required, Validators.min(0)]);
    this.mortalityRateFC = new FormControl('', [Validators.required, Validators.min(0)]);
    this.daysFromInfectionUntilRecoveryFC = new FormControl('', [Validators.required, Validators.min(1)]);
    this.daysFromInfectionToDeathFC = new FormControl('', [Validators.required, Validators.min(1)]);
    this.numberSimulationDaysFC = new FormControl('', [Validators.required, Validators.min(1)]);
    this.setValue(data);
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
    this.simulationService.updateSimulation(this.getDataWithID()).subscribe(
      () => this.dialogRef.close());
  }

  getDataWithID(): SimulationInterface {
    return {
      // @ts-ignore
      id: this.id,
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

  setValue(data: SimulationInterface): void {
    this.id = data.id;
    this.simulationNameFC.setValue(data.simulationName);
    this.populationSizeFC.setValue(data.populationSize);
    this.initialNumberInfectedPeopleFC.setValue(data.initialInfectedPeople);
    this.virusReproductionRateFC.setValue(data.virusReproductionRate);
    this.mortalityRateFC.setValue(data.mortalityRate);
    this.daysFromInfectionUntilRecoveryFC.setValue(data.daysFromInfectionUntilRecovery);
    this.daysFromInfectionToDeathFC.setValue(data.daysFromInfectionToDeath);
    this.numberSimulationDaysFC.setValue(data.simulationDays);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
