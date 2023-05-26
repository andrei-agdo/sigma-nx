import { SearchButtonComponent } from '@sigma-nx/components/search-button';
import { FilterButtonComponent } from '@sigma-nx/components/filter-button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentosComponent } from './departamentos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TableModule } from '@sigma-nx/components/table';
import { InputModule } from '@sigma-nx/components/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DepartamentosComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    TableModule,
    FilterButtonComponent,
    SearchButtonComponent,
    InputModule,
    FormsModule,
    MatIconModule,
    MatSlideToggleModule
  ]
})
export class DepartamentosModule { }
