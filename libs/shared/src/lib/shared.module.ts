import { NgModule } from '@angular/core';
import { InputModule } from '@sigma-nx/components/input';
import { TableModule } from '@sigma-nx/components/table';
import { FilterButtonComponent } from '@sigma-nx/components/filter-button';
import { SearchButtonComponent } from '@sigma-nx/components/search-button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  imports: [
    FilterButtonComponent,
    SearchButtonComponent],
  exports: [
    TableModule,
    MatButtonModule,
    MatDialogModule,
    FilterButtonComponent,
    SearchButtonComponent,
    InputModule,
    FormsModule,
    MatIconModule,
    MatSlideToggleModule],
})
export class SharedModule { }
