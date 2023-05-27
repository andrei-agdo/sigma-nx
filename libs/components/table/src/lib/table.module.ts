import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableHeaderComponent } from './components/header.component';
import { TableItemDirective } from './components/table-item.directive';
import { TableItemExpandedDirective } from './components/expanded-item.directive';
import { CustomPaginator } from './customPaginatorConfiguration';

@NgModule({
  declarations: [
    TableComponent,
    TableHeaderComponent,
    TableItemDirective,
    TableItemExpandedDirective,
  ],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  exports: [
    TableComponent,
    TableHeaderComponent,
    TableItemDirective,
    TableItemExpandedDirective,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },],
})
export class TableModule {}
