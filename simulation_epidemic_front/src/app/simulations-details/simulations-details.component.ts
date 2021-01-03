import {Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {SimulationInterface} from '../model/simulation.interface';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {SimulationService} from '../simulation.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {switchMap, tap} from 'rxjs/operators';
import {SimulationStepInterface} from '../model/simulation.step.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ChartDataSets, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {CharService} from '../char.service';

@Component({
  selector: 'app-simulations-details',
  templateUrl: './simulations-details.component.html',
  styleUrls: ['./simulations-details.component.css']
})
export class SimulationsDetailsComponent implements OnInit, AfterViewInit {

  @Input() simulation!: SimulationInterface;
  simulationSteps!: SimulationStepInterface[];
  headElements = ['daySimulation', 'infectedPeople',
    'healthyPeople', 'diedPeople',
    'recoveredPeople'];
  allFG: FormGroup;
  simulationNameFC: FormControl;
  populationSizeFC: FormControl;
  initialNumberInfectedPeopleFC: FormControl;
  virusReproductionRateFC: FormControl;
  mortalityRateFC: FormControl;
  daysFromInfectionUntilRecoveryFC: FormControl;
  daysFromInfectionToDeathFC: FormControl;
  numberSimulationDaysFC: FormControl;

  dataSource!: MatTableDataSource<SimulationStepInterface>;

  lineChartData: ChartDataSets[] = [{}];
  lineChartLabels!: string[];
  infectedPeople!: number[];
  healthyPeople!: number[];
  diedPeople!: number[];
  recoveredPeople!: number[];
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private route: ActivatedRoute,
    private simulationService: SimulationService,
    private location: Location,
    private charService: CharService
  ) {
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

    this.dataSource = new MatTableDataSource<SimulationStepInterface>();
  }

  ngOnInit(): void {
    this.getSimulation();
    this.getSimulationSteps();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getSimulation(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.simulationService.getSimulation(id).pipe(
      tap(simulation => {
        this.simulation = simulation;
        this.setValue();
      })
    ).subscribe();
  }

  getSimulationSteps(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.simulationService.getSimulationSteps(id).pipe(
      tap(simulationSteps => {
        this.dataSource.data = simulationSteps;
        this.simulationSteps = simulationSteps;
        this.infectedPeople = this.charService.getInfectedPeople(simulationSteps);
        this.healthyPeople = this.charService.getHealthyPeople(simulationSteps);
        this.diedPeople = this.charService.getDiedPeople(simulationSteps);
        this.recoveredPeople = this.charService.getRecoveredPeople(simulationSteps);
        this.lineChartData = [{data: this.infectedPeople, label: 'infected people'},
          {data: this.healthyPeople, label: 'healthy people'},
          {data: this.diedPeople, label: 'died people'},
          {data: this.recoveredPeople, label: 'recovered people'}
        ];
        this.lineChartLabels = this.charService.getDaySimulation(simulationSteps);

      })
    ).subscribe();
  }
  goBack(): void {
    this.location.back();
  }

  setValue(): void {
    this.simulationNameFC.setValue(this.simulation.simulationName);
    this.populationSizeFC.setValue(this.simulation.populationSize);
    this.initialNumberInfectedPeopleFC.setValue(this.simulation.initialInfectedPeople);
    this.virusReproductionRateFC.setValue(this.simulation.virusReproductionRate);
    this.mortalityRateFC.setValue(this.simulation.mortalityRate);
    this.daysFromInfectionUntilRecoveryFC.setValue(this.simulation.daysFromInfectionUntilRecovery);
    this.daysFromInfectionToDeathFC.setValue(this.simulation.daysFromInfectionToDeath);
    this.numberSimulationDaysFC.setValue(this.simulation.simulationDays);
  }

  getDataWithID(): SimulationInterface {
    return {
      id: this.simulation.id,
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

  updateSimulation(): void {
    this.simulationService.updateSimulation(this.getDataWithID()).pipe(
      switchMap(() => this.simulationService.getSimulation(this.simulation.id)),
      tap((simulation => this.simulation = simulation))
    ).subscribe();
  }

}
