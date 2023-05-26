import { RequisitoLegal } from './../../../../../controle-requisitos/requisito-legal/shared/requisito-legal';
import { RequisitoLegalSimplificado } from './../../../../../controle-requisitos/requisito-legal/shared/requisito-legal-simplificado';
import { RequisitoLegalFilter } from './../../../../../controle-requisitos/requisito-legal/shared/requisito-legal-filter';
import { RequisitoLegalService } from './../../../../../controle-requisitos/requisito-legal/shared/requisito-legal.service';
import { Component, inject, EventEmitter, Output, Input, signal } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { switchMap, map, debounceTime } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sigma-nx-legislacao-aplicada',
  templateUrl: './legislacao-aplicada.component.html',
  styleUrls: ['./legislacao-aplicada.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class LegislacaoAplicadaComponent {

  private requisitoLegalService = inject(RequisitoLegalService);

  private _numeroPasta?: number;
  @Input({ required: true })
  set numeroPasta(value: number | undefined) {
    this._numeroPasta = value;
    this.filter.mutate(f => {
      if (value)
        f.numerosPasta = [value]
    });
  }
  get numeroPasta() {
    return this._numeroPasta;
  }

  public filter = signal<RequisitoLegalFilter>({}, { equal: () => false });

  public legislacoes = toSignal(
    toObservable(this.filter)
      .pipe(
        debounceTime(400),
        switchMap((filter) => this.requisitoLegalService.get(filter)),
        map((legislacoes) =>
          legislacoes.filter((legislacao) =>
            !this.legislacaoAplicada?.some((e) => e.id === legislacao.id)
          )
        )
      ),
    { initialValue: [] }
  );

  public opened = true;

  @Input({ required: true }) legislacaoAplicada: RequisitoLegalSimplificado[] = [];
  @Output() legislacaoAplicadaChange = new EventEmitter<RequisitoLegalSimplificado[]>();

  search(term: any) {
    this.filter.mutate(f => {
      f.palavraChave = term.target.value;
    });
  }
  trazerTodos = false;
  filterTrazerTodos() {
    this.filter.mutate(f => {
      if (this.trazerTodos)
        f.numerosPasta = undefined;
      else if (this.numeroPasta)
        f.numerosPasta = [this.numeroPasta]
    });
  }

  addLegislacaoAplicada(legislacaoAplicada: RequisitoLegalSimplificado) {
    this.filter.mutate(f => f.palavraChave = '');

    this.legislacaoAplicada.push(legislacaoAplicada);
    this.legislacaoAplicadaChange.emit(this.legislacaoAplicada);
  }

  removeLegislacaoAplicada(legislacaoAplicada: RequisitoLegal) {
    this.legislacaoAplicada = this.legislacaoAplicada.filter(
      (l) => l.id !== legislacaoAplicada.id
    );
    this.legislacaoAplicadaChange.emit(this.legislacaoAplicada);
  }
}
