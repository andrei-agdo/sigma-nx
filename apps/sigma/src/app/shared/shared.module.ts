
import { TableModule } from '@sigma-nx/components/table';
import { CustomPaginator } from '@core/services/customPaginatorConfiguration';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AlertService, AlertComponent } from './services/alert.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FormComponent } from '@sigma-nx/components/input';
import { FilterButtonComponent } from '@sigma-nx/components/filter-button';
import { CurrencyList } from '@core/utils/currency.config';
import { InputModule } from '@sigma-nx/components/input';

import { SearchButtonComponent } from '@sigma-nx/components/search-button';
import { MaterialModule } from '@sigma-nx/material';
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

@NgModule({
  imports: [MaterialModule,
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
    MaterialModule,
    InputModule,
    CommonModule,
    NgxMaskModule,
    FormsModule,
    TableModule,
    FormComponent,
    FilterButtonComponent,
    SearchButtonComponent
  ],
  providers: [
    AlertService,
    ...CurrencyList,
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
  ],
})
export class SharedModule { }
