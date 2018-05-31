import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PunkApiService } from './services/punk-api.service';
import { SearchTextService } from './services/search-text.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    PunkApiService,
    SearchTextService,
  ]
})
export class CoreModule { }
