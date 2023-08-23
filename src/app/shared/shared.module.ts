import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { PageBreadCrumbComponent } from './components/page-bread-crumb/page-bread-crumb.component';
import { CountDownTimerComponent } from './components/count-down-timer/count-down-timer.component';
import { PrimengUiComponentsModule } from '../primeng-ui-components.module';
import { ConfirmActionComponent } from './components/confirm-action/confirm-action.component';
import { GenericApiMessageComponent } from './components/generic-api-message/generic-api-message.component';
import { ExamComponent } from './components/commonComponents/exam/exam.component';
import { ResultComponent } from './components/commonComponents/result/result.component';
import { AttendanceComponent } from './components/commonComponents/attendance/attendance.component';
import { HolidaysComponent } from './components/commonComponents/holidays/holidays.component';



@NgModule({
  declarations: [
    DataGridComponent,
    PageBreadCrumbComponent,
    CountDownTimerComponent,
    ConfirmActionComponent,
    GenericApiMessageComponent,
    ExamComponent,
    ResultComponent,
    AttendanceComponent,
    HolidaysComponent,

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    PrimengUiComponentsModule
  ],
  exports: [
    DataGridComponent,
    PageBreadCrumbComponent,
    CountDownTimerComponent,
    ExamComponent,
    ResultComponent,
    AttendanceComponent,
    HolidaysComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
