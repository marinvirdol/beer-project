import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindBeersComponent } from './find-beers/find-beers.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';

const routes: Routes = [
  { path: 'beers', component: FindBeersComponent },
  { path: 'beers/:id', component: BeerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeersRoutingModule { }

export const routedComponents = [FindBeersComponent];
