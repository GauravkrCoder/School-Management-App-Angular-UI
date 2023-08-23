import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { PrimengUiComponentsModule } from 'src/app/primeng-ui-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectCommonFormComponent } from './project-common-form/project-common-form.component';


@NgModule({
  declarations: [
    ProjectListComponent,
    AddProjectComponent,
    EditProjectComponent,
    DeleteProjectComponent,
    ProjectCommonFormComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    PrimengUiComponentsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProjectModule { }
