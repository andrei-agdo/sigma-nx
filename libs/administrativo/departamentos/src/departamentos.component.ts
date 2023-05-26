import { Filter } from './shared/filter';
import { DepartamentosService } from './shared/departamentos.service';

import { MatDialog } from '@angular/material/dialog';
import { TablePagination } from '@sigma-nx/components/table';
import { Component } from '@angular/core';
import { Departamento } from './shared/departamento';

@Component({
  selector: 'sigma-nx-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss'],
})
export class DepartamentosComponent {
  public filter: Filter & Partial<Departamento> = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public departamentos: Departamento[] = [];

  constructor(
    private matDialog: MatDialog,
    private departamentosService: DepartamentosService
  ) { }

  ngOnInit(): void {
    this.getDepartamentos();
  }

  getDepartamentos(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;


    this.departamentosService.get(this.filter).subscribe((departamentos) => {
      this.departamentos = departamentos;
    });
  }

  changeStatus(departamento: Departamento) {
    this.departamentosService.atualizarAtivo(departamento).subscribe();
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getDepartamentos();
  }

  sortBy(prop: string) {
    if (this.filter.ordenarPor === prop && this.filter.eDecrescente) {
      this.filter.ordenarPor = '';
      this.filter.eDecrescente = false;
    } else {
      this.filter.eDecrescente =
        this.filter.ordenarPor === prop ? !this.filter.eDecrescente : false;
      this.filter.ordenarPor = prop;
    }
    this.getDepartamentos();
  }

  async openDepartamento(departamento?: Departamento) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { departamento },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getDepartamentos());
  }
}
