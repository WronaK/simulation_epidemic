import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SimulationInterface} from '../model/simulation.interface';
import {SimulationService} from '../simulation.service';
import {Router} from '@angular/router';

import {switchMap, tap} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddSimulationComponent} from '../add-simulation/add-simulation.component';
import {Observable} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html',
  styleUrls: ['./simulations.component.css']
})
export class SimulationsComponent implements OnInit, AfterViewInit {
  simulations: SimulationInterface[] = [];
  selectedSimulation: SimulationInterface | undefined;
  dataSource!: MatTableDataSource<SimulationInterface>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  headElements = ['simulationName', 'populationSize',
    'initialInfectedPeople', 'virusReproductionRate',
    'mortalityRate', 'daysFromInfectionUntilRecovery',
    'daysFromInfectionToDeath', 'simulationDays'];

  constructor(
    private dialog: MatDialog,
    private simulationService: SimulationService,
    private router: Router) {
    this.dataSource = new MatTableDataSource<SimulationInterface>();

  }

  ngOnInit(): void {
    this.getSimulations().subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddSimulationComponent, dialogConfig)
      .afterClosed()
      .pipe(
        switchMap(() => this.getSimulations()),
      ).subscribe();
  }

  getSimulations(): Observable<SimulationInterface[]> {
    return this.simulationService.getSimulations().pipe(
      tap(simulations => {
        this.simulations = simulations;
        this.dataSource.data = simulations;
      }));
  }

  onSelect(simulation: SimulationInterface): void {
    this.selectedSimulation = simulation;
  }

  goToSimulation(): void {
    this.router.navigate(['simulation/' + this.selectedSimulation?.id]);
  }

  removeSimulation(): void {
    if (this.selectedSimulation) {
      this.simulationService.removeSimulation(this.selectedSimulation.id).pipe(
        switchMap(() => this.simulationService.getSimulations()),
        tap(simulations => {
          this.simulations = simulations;
          this.dataSource.data = simulations;
        })
      ).subscribe();
      this.selectedSimulation = undefined;
    }
  }

}
