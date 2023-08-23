import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminExamRoutingModule } from './admin-exam-routing.module';
import { AdminExamComponent } from './admin-exam/admin-exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengUiComponentsModule } from 'src/app/primeng-ui-components.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdminExamComponent
  ],
  imports: [
    CommonModule,
    AdminExamRoutingModule,
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
})
export class AdminExamModule { }
