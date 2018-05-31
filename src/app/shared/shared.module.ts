import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ArrayGroupByPipe } from './pipes/array-group-by.pipe';
import { ObjectKeysPipe } from './pipes/object-keys.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ArrayGroupByPipe,
    ObjectKeysPipe,
  ],
  exports: [
    ArrayGroupByPipe,
    ObjectKeysPipe,
  ],
})
export class SharedModule { }
