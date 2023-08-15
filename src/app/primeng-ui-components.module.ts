import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DockModule } from 'primeng/dock';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutoCompleteModule,
    TableModule,
    DynamicDialogModule,
    PaginatorModule,
    ConfirmDialogModule,
    InputTextModule,
    CheckboxModule,
    PanelMenuModule,
    DockModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    ChipsModule
  ],
  exports: [
    CommonModule,
    AutoCompleteModule,
    TableModule,
    DynamicDialogModule,
    PaginatorModule,
    ConfirmDialogModule,
    InputTextModule,
    CheckboxModule,
    DockModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    ChipsModule
  ]
})
export class PrimengUiComponentsModule { }
