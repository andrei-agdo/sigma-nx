
import { TableModule } from '@sigma-nx/components/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '@sigma-nx/components/input';
import { FilterButtonComponent } from '@sigma-nx/components/filter-button';
import { CurrencyList } from '@core/utils/currency.config';
import { InputModule } from '@sigma-nx/components/input';

import { SearchButtonComponent } from '@sigma-nx/components/search-button';
// Antes de colocar um item aqui faça a seguinte pergunta:

// Esse componente/pipe/etc..., vai (ou poderá) ser utilizado em VÁRIOS lugares?

// Se a resposta for:
// Não, é um componente pra agregar uma página específica.
// Então a declaração deve ser junto com a pasta, e não aqui
// EX:
// um chart(gráfico) no dashboard:
// ERRADO:
// ng g c shared/components/dashboard-chart
// CERTO:
// ng g c dashboard/chart

// Aqui é SE E SOMENTE SE o componente/pipe/etc... for utilizado em 2 ou mais componentes
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ModalService } from '@sigma-nx/services/modal';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponent,
    FilterButtonComponent,
    SearchButtonComponent
  ],
  exports: [
    InputModule,
    CommonModule,
    FormsModule,
    TableModule,
    FormComponent,
    FilterButtonComponent,
    SearchButtonComponent,
    MatSlideToggleModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    ModalService,
    ...CurrencyList,

    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { panelClass: 'dialog-panel' },
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],
})
export class SharedModule { }
