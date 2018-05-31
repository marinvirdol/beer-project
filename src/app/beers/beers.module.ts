import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { BeersRoutingModule } from './beers-routing.module';

import { FindBeersComponent } from './find-beers/find-beers.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    BeersRoutingModule,
  ],
  declarations: [
    FindBeersComponent,
    BeerDetailsComponent,
    PaginationComponent,
  ]
})
export class BeersModule {}
