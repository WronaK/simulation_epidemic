import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {SimulationInterface} from '../model/simulation.interface';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {SimulationService} from '../simulation.service';
import {switchMap, tap} from 'rxjs/operators';
import {SimulationStepInterface} from '../model/simulation.step.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ChartDataSets, ChartType} from 'chart.js';
import {Color} from 'ng2-charts';
import {CharService} from '../char.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UpdateSimulationComponent} from '../update-simulation/update-simulation.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-simulations-details',
  templateUrl: './simulations-details.component.html',
  styleUrls: ['./simulations-details.component.css']
})
export class SimulationsDetailsComponent implements OnInit, AfterViewInit {
  simulation!: SimulationInterface;
  simulationSteps!: SimulationStepInterface[];
  headElements = ['daySimulation', 'infectedPeople',
    'healthyPeople', 'diedPeople',
    'recoveredPeople'];
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

  lineChartColors: Color[] = [{}];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private route: ActivatedRoute,
    private simulationService: SimulationService,
    private location: Location,
    private charService: CharService,
    private dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource<SimulationStepInterface>();
  }

  ngOnInit(): void {
    this.getSimulation().subscribe();
    this.getSimulationSteps().subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.simulation.id,
      simulationName: this.simulation.simulationName,
      populationSize: this.simulation.populationSize,
      initialInfectedPeople: this.simulation.initialInfectedPeople,
      virusReproductionRate: this.simulation.virusReproductionRate,
      mortalityRate: this.simulation.mortalityRate,
      daysFromInfectionUntilRecovery: this.simulation.daysFromInfectionUntilRecovery,
      daysFromInfectionToDeath: this.simulation.daysFromInfectionToDeath,
      simulationDays: this.simulation.simulationDays
    };
    this.dialog.open(UpdateSimulationComponent, dialogConfig)
      .afterClosed()
      .pipe(
        switchMap(() => this.getSimulation()),
        switchMap(() => this.getSimulationSteps()),
      ).subscribe();
  }

  getSimulation(): Observable<SimulationInterface> {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    return this.simulationService.getSimulation(id).pipe(
      tap(simulation => {
        this.simulation = simulation;
      }));
  }

  getSimulationSteps(): Observable<SimulationStepInterface[]> {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    return this.simulationService.getSimulationSteps(id).pipe(
      tap(simulationSteps => {
        this.simulationSteps = simulationSteps;
        this.dataSource.data = simulationSteps;
        this.infectedPeople = this.charService.getInfectedPeople(simulationSteps);
        this.healthyPeople = this.charService.getHealthyPeople(simulationSteps);
        this.diedPeople = this.charService.getDiedPeople(simulationSteps);
        this.recoveredPeople = this.charService.getRecoveredPeople(simulationSteps);
        this.lineChartData = [{data: this.infectedPeople, label: 'liczba osób zarażonych'},
          {data: this.healthyPeople, label: 'liczba osób, zdrowych podatnych na infekcję'},
          {data: this.diedPeople, label: 'liczba osób zamrłych'},
          {data: this.recoveredPeople, label: 'liczba osób, które wyzdrowiały i nabyły odpornośc'}
        ];
        this.lineChartLabels = this.charService.getDaySimulation(simulationSteps);

      })
    );
  }
  goBack(): void {
    this.location.back();
  }
}
