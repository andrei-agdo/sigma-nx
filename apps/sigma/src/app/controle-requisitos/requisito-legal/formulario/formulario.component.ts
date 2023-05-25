import { debounceTime, finalize, map, switchMap, tap } from 'rxjs/operators';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { load } from '@core/utils/load/load.component';
import { FormComponent } from '@shared/components/form/form.component';
import { RequisitoLegal } from './../shared/requisito-legal';
import { Component, signal, OnInit, Input } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RequisitoLegalFacade } from '../shared/requisito-legal.facade';
import { Tema } from '../../../administrativo/temas/shared/tema';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent extends RequisitoLegalFacade implements OnInit {

  @Input() id: string;

  public requisitoLegal: RequisitoLegal = {
    ativo: true
  };

  public tema: Tema;
  public numeroPasta?: number;

  public termEvidencia = signal<string>('', { equal: () => false });
  public evidencias = toSignal(
    toObservable(this.termEvidencia).pipe(
      debounceTime(400),
      switchMap((term) => this.evidenciasPMService.filter({ nome: term })),
      map((evidencias) =>
        evidencias.filter((evidencia) =>
          !this.requisitoLegal.controlesLicencasId?.some((e) => e.id === evidencia.id)
        )
      )
    ),
    { initialValue: [] }
  );

  public termGacp = signal<string>('', { equal: () => false });
  public gacps = toSignal(
    toObservable(this.termGacp).pipe(
      debounceTime(400),
      switchMap((term) => this.gacps$),
      map((gacps) =>
        gacps.filter((gacp) =>
          !this.requisitoLegal.gacpsId?.some((e) => e.id === gacp.id)
        )
      ),
    ),
    { initialValue: [] }
  );

  ngOnInit(): void {
    if (this.id) {
      load.show();
      this.requisitoLegalService
        .getById(this.id).pipe(
          finalize(() => load.hide())
        )
        .subscribe(
          (requisitoLegal) => (this.requisitoLegal = requisitoLegal)
        );
    }
  }

  addEvidencia(evidencia: any) {
    this.termEvidencia.set('');

    if (!this.requisitoLegal.controlesLicencasId) this.requisitoLegal.controlesLicencasId = [];
    this.requisitoLegal.controlesLicencasId.push(evidencia);
  }

  addGacp(gacp: any) {
    this.termGacp.set('');

    if (!this.requisitoLegal.gacpsId) this.requisitoLegal.gacpsId = [];
    this.requisitoLegal.gacpsId.push(gacp);
  }

  removeEvidencia(evidencia: any) {
    this.requisitoLegal.controlesLicencasId = this.requisitoLegal.controlesLicencasId?.filter(
      (e) => e !== evidencia
    );
  }

  removeGacp(gacp: any) {
    this.requisitoLegal.gacpsId = this.requisitoLegal.gacpsId?.filter(
      (e) => e !== gacp
    );
  }

  selectTema(temaId: string, temas: Tema[]) {
    queueMicrotask(() => {
      const tema = temas.find((tema) => tema.id === temaId);

      if (tema)
        this.numeroPasta = tema.numeroPasta;
    });
  }

  gacpObrigatorio = false;
  selectAtendimento(atendimento: any) {
    this.gacpObrigatorio = atendimento.descricao == "Sim";
  }

  return() { this.router.navigateByUrl('/controle-requisitos/requisito-legal'); }

  salvarRequisitoLegal(form: FormComponent) {
    if (!form.valid()) return;
    load.show();

    console.error("REMOVIDO GACP E EVIDENCIAS");
    delete this.requisitoLegal.gacpsId;
    delete this.requisitoLegal.controlesLicencasId

    this.requisitoLegalService.save(this.requisitoLegal).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          `Requisito Legal ${!this.requisitoLegal.id ? 'cadastrado' : 'editado'
          } com sucesso`
        );

        this.return();
      },
      error: (error) => {
        load.hide();
        this.modalService.error(error);
      },
    });
  }

}
