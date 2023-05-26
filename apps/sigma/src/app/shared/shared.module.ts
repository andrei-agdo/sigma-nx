import { CustomPaginator } from '@core/services/customPaginatorConfiguration';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ModalService } from './components/modal/modal.service';
import { AlertService, AlertComponent } from './services/alert.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FormComponent } from './components/form/form.component';
import { ButtonComponent } from './components/button/button.component';
import { TableModule } from './components/table/table.module';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { SearchButtonComponent } from './components/search-button/search-button.component';
import { ModalComponent } from './components/modal/modal.component';
import { CurrencyList } from '@core/utils/currency.config';
import { InputModule } from '@sigma-nx/components/input';

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
  ],
  declarations: [
    FormComponent,
    ButtonComponent,
    AlertComponent,
    FilterButtonComponent,
    SearchButtonComponent,
    ModalComponent,
  ],
  exports: [
    MaterialModule,
    InputModule,
    CommonModule,
    FormComponent,
    NgxMaskModule,
    ButtonComponent,
    FormsModule,
    TableModule,
    FilterButtonComponent,
    SearchButtonComponent
  ],
  providers: [

    AlertService,
    ModalService,
    ...CurrencyList,
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
  ],
})
export class SharedModule { }
