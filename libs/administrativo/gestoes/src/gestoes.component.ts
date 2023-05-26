import { GestoesService } from './shared/gestoes.service';
import { MatDialog } from '@angular/material/dialog';
import { TablePagination } from '@sigma-nx/components/table';
import { Gestao } from './shared/gestao';
import { Component } from '@angular/core';
import { Filter } from './shared/filter';

@Component({
  selector: 'sigma-nx-gestoes',
  templateUrl: './gestoes.component.html',
  styleUrls: ['./gestoes.component.scss'],
})
export class GestoesComponent {
  public filter: Filter & Gestao = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public gestoes: Gestao[];

  constructor(
    private matDialog: MatDialog,
    private gestoesService: GestoesService
  ) {}

  ngOnInit(): void {
    this.getGestoes();
  }

  getGestoes(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;


    this.gestoesService.get(this.filter).subscribe((gestoes) => {
      this.gestoes = gestoes;
    });
  }

  changeStatus(gestao: Gestao) {
    this.gestoesService.atualizarAtivo(gestao).subscribe();
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getGestoes();
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
    this.getGestoes();
  }

  async openGestao(gestao?: Gestao) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { gestao },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getGestoes());
  }
}
