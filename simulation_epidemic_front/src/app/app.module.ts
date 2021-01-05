import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SimulationsComponent } from './simulations/simulations.component';
import { SimulationsDetailsComponent } from './simulations-details/simulations-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ChartsModule} from 'ng2-charts';
import { AddSimulationComponent } from './add-simulation/add-simulation.component';
import { UpdateSimulationComponent } from './update-simulation/update-simulation.component';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    SimulationsComponent,
    SimulationsDetailsComponent,
    AddSimulationComponent,
    UpdateSimulationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    ChartsModule,
    MatGridListModule
  ],
  entryComponents: [
    AddSimulationComponent,
    UpdateSimulationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
