import { Component, Input } from '@angular/core';
import { MonitoramentoEControleDeLicencasService } from '../shared/monitoramento-e-controle-de-licencas.service';
import { MonitoramentoEControleDeLicenca } from '../shared/monitoramento-e-controle-de-licencas';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss'],
  standalone: true,
  imports: [RouterModule, NgIf, MatButtonModule],
})
export class MonitoramentoComponent {
  @Input() monitoramentoId: string;

  monitoramentoControleLicenca: MonitoramentoEControleDeLicenca;

  constructor(private monitoramentoService: MonitoramentoEControleDeLicencasService) { }

  ngOnInit(): void {
    this.getMonitoramento();
  }

  getMonitoramento() {
    this.monitoramentoService
      .getById(this.monitoramentoId)
      .subscribe((monitoramento) => {
        this.monitoramentoService.monitoramento.next(monitoramento);
      });
  }

  ngOnDestroy(): void {
    this.monitoramentoService.clearMonitoramento();
  }
}
