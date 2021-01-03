import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulationsComponent } from './simulations/simulations.component';
import { SimulationsDetailsComponent} from './simulations-details/simulations-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/simulations', pathMatch: 'full'},
  { path: 'simulations', component: SimulationsComponent},
  { path: 'simulation/:id', component: SimulationsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
