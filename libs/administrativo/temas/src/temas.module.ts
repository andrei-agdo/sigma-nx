import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemasRoutingModule } from './temas-routing.module';
import { TemasComponent } from './temas.component';
import { InputModule } from '@sigma-nx/components/input';
import { TableModule } from '@sigma-nx/components/table';
import { FilterButtonComponent } from '@sigma-nx/components/filter-button';
import { SearchButtonComponent } from '@sigma-nx/components/search-button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    TemasComponent
  ],
  imports: [
    CommonModule,
    TemasRoutingModule,
    TableModule,
    FilterButtonComponent,
    SearchButtonComponent,
    InputModule,
    FormsModule,
    MatIconModule,
    MatSlideToggleModule
  ]
})
export class TemasModule { }
