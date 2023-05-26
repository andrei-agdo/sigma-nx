import { NgModule } from '@angular/core';
import { InputModule } from '@sigma-nx/components/input';
import { TableModule } from '@sigma-nx/components/table';
import { FilterButtonComponent } from '@sigma-nx/components/filter-button';
import { SearchButtonComponent } from '@sigma-nx/components/search-button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModalService } from '@sigma-nx/services/modal';
@NgModule({
  imports: [
    FilterButtonComponent,
    SearchButtonComponent],
  exports: [TableModule,
    FilterButtonComponent,
    SearchButtonComponent,
    InputModule,
    FormsModule,
    MatIconModule,
    MatSlideToggleModule],
  providers: [ModalService],
})
export class SharedModule { }
