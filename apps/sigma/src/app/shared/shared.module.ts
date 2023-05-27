
import { TableModule } from '@sigma-nx/components/table';
import { CustomPaginator } from '@core/services/customPaginatorConfiguration';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {  AlertComponent } from './services/alert.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
    NgxMaskModule.forRoot(),
    FormComponent,
    FilterButtonComponent,
    SearchButtonComponent
  ],
  declarations: [
    AlertComponent,
  ],
  exports: [
    InputModule,
    CommonModule,
    NgxMaskModule,
    FormsModule,
    TableModule,
    FormComponent,
    FilterButtonComponent,
    SearchButtonComponent,
    MatSlideToggleModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [
    ModalService,
    ...CurrencyList,
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },

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
