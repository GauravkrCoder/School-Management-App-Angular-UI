import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengUiComponentsModule } from 'src/app/primeng-ui-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimengUiComponentsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
