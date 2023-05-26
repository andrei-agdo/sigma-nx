import { Component, Input, inject, Output, EventEmitter, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from '@sigma-nx/components/table';
import { MatDialog } from '@angular/material/dialog';
import { Prazo } from '../../../shared/prazos';
import { TableComponent } from '@sigma-nx/components/table';
import { Base } from '@shared/models/base';

@Component({
  selector: 'sigma-nx-tabela-prazo',
  templateUrl: './tabela-prazo.component.html',
  standalone: true,
  styles: ['.plus {border-radius:4px}'],
  imports: [TableModule, MatButtonModule, CommonModule, MatIconModule]
})
export class TabelaPrazoComponent {
  @Input({ required: true }) prazos: Prazo[] = [];
  @Output() prazosChange = new EventEmitter<Prazo[]>();

  @Input({ required: true }) periodicidade?: Base;
  @Input({ required: true }) anos?: number;
  @Input({ required: true }) vencimento?: 'Indeterminado' | 'Por Prazo' | 'Obsoleto';

  @ViewChild('table') table: TableComponent;
  matDialog = inject(MatDialog);

  constructor() {
    if (!this.prazos) this.prazos = [];
  }

  get statusVencimento() {
    return (this.vencimento === 'Por Prazo')
  }

  async openPrazo(prazo?: Prazo) {
    const { PrazoDialogComponent } = await import('../prazo-dialog/prazo-dialog.component');
    const _prazos = structuredClone(this.prazos);

    this.matDialog
      .open(PrazoDialogComponent, {
        data: {
          prazo,
          periodicidade: this.periodicidade,
          anos: this.anos
        }
      })
      .afterClosed()
      .subscribe((data) => {
        if (!data) return this.prazos = _prazos;
        if (!prazo) this.prazos.push(data);

        this.table.data = this.prazos;
        this.prazosChange.emit(this.prazos);

      });
  }

}
