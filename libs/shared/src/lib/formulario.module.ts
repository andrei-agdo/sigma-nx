import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormComponent, InputModule } from '@sigma-nx/components/input';

@NgModule({
  imports: [FormComponent],
  exports: [CommonModule, FormComponent, MatDialogModule, MatButtonModule,MatSlideToggleModule, FormsModule, MatIconModule, InputModule],
})
export class FormularioModule { }
