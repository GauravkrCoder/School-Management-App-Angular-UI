import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserDashComponent } from './user-dash/user-dash.component';
import { PrimengUiComponentsModule } from 'src/app/primeng-ui-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';



@NgModule({
  declarations: [
    UserDashComponent,
    HomePageComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimengUiComponentsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PrimengUiComponentsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
