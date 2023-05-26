import { AmbitoRoutingModule } from './ambito-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbitoComponent } from './ambito.component';
import { InputModule } from '@sigma-nx/components/input';
import { TableModule } from '@sigma-nx/components/table';
import { FilterButtonComponent } from '@sigma-nx/components/filter-button';
import { SearchButtonComponent } from '@sigma-nx/components/search-button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [AmbitoComponent],
  imports: [CommonModule, AmbitoRoutingModule, TableModule,
    FilterButtonComponent,
    SearchButtonComponent,
    InputModule,
    FormsModule,
    MatIconModule,
    MatSlideToggleModule],
})
export class AmbitoModule {}
