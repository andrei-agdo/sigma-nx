import { load } from '@core/utils/load/load.component';
import { TablePagination } from '@shared/components/table/models/table-pagination.model';
import { Filter } from '@shared/models/filter';
import { Component, inject } from '@angular/core';
import { RequisitoLegalFacade } from './shared/requisito-legal.facade';
import { RequisitoLegalSimplificado } from './shared/requisito-legal-simplificado';
import { RequisitoLegalFilter } from './shared/requisito-legal-filter';
import { ModalService } from '@shared/components/modal/modal.service';

@Component({
  selector: 'sigma-nx-requisito-legal',
  templateUrl: './requisito-legal.component.html',
  styleUrls: ['./requisito-legal.component.scss'],
})
export class RequisitoLegalComponent extends RequisitoLegalFacade {
  public filter: Filter & RequisitoLegalFilter = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public requisitosLegais: RequisitoLegalSimplificado[];

  private podeAtualizarDataAnalise = false;

  ngOnInit(): void {
    this.getRequisitos();
  }

  getRequisitos(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;

    load.show();
    this.requisitoLegalService
      .get(this.filter)
      .subscribe((requisitosLegais) => {
        this.requisitosLegais = requisitosLegais;
        this.podeAtualizarDataAnalise = true;
        load.hide();
      });
  }

  cancelarAtualizarDataAnalise = () => this.podeAtualizarDataAnalise = false;


  changeStatus(requisitoLegal: RequisitoLegalSimplificado) {
    load.show();
    this.requisitoLegalService.atualizarAtivo(requisitoLegal).subscribe(() => {
      load.hide();
    });
  }


  async atualizarDataAnalise() {
    const { SelectDataComponent } = await import(
      './select-data/select-data.component'
    );

    // Só abre o modal se tiver requisitos legais e data de análise selecionada e filtro aplicado
    if (this.podeAtualizarDataAnalise && this.requisitosLegais.length > 0 && this.filter.dataAnalise != null)
      this.matDialog
        .open(SelectDataComponent, {
          data: this.requisitosLegais
        })
        .afterClosed()
        .subscribe(() => this.getRequisitos());
    else {
      this.modalService.error("É necessário selecionar uma data de análise e realizar o filtro");
    }
  }

  exportAsExcel() {
    this.requisitoLegalService.gerarXlsx(this.filter)
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getRequisitos();
  }


  openRequisitoLegal(requisitoLegal?: RequisitoLegalSimplificado) {
    this.router.navigateByUrl(
      'controle-requisitos/requisito-legal/formulario/' +
      (requisitoLegal?.id || '')
    );
  }
}
