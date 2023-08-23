import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminExamComponent } from './admin-exam/admin-exam.component';

const routes: Routes = [
  { path: 'exam', component: AdminExamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
