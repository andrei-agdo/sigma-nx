import { Component, Input } from '@angular/core';

@Component({
  selector: 'tabela-acoes',
  templateUrl: './tabela-acoes.component.html',
  styleUrls: ['./tabela-acoes.component.scss'],
})
export class TabelaAcoesComponent {

  @Input({required:true}) acoes= [];
}
