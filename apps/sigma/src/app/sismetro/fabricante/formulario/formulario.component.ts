import { load } from '@core/utils/load/load.component';
import { FormComponent } from '@sigma-nx/components/input';
import { ModalService } from '@shared/components/modal/modal.service';
import { FabricanteService } from './../shared/fabricante.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fabricante } from './../shared/fabricante';
import { SharedModule } from '@shared/shared.module';
import { Component, Inject } from '@angular/core';
import { EnderecoService } from '@shared/services/endereco.service';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  public fabricante: Fabricante;

  public cepNaoEncontrado = false;

  public estados = this.enderecoService.getEstados();

  public get telefone(): string {
    if (!this.fabricante.telefones) return '';
    return this.fabricante.telefones[0].numero;
  }

  public set telefone(v: string) {
    if (!this.fabricante.telefones) this.fabricante.telefones = [];
    this.fabricante.telefones[0].numero = v;
  }

  public get celular(): string {
    if (!this.fabricante.telefones) return '';
    return this.fabricante.telefones[1].numero;
  }

  public set celular(v: string) {
    if (!this.fabricante.telefones) this.fabricante.telefones = [];
    this.fabricante.telefones[1].numero = v;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { fabricante?: Fabricante },
    private fabricantesService: FabricanteService,
    public dialogRef: MatDialogRef<FormularioComponent, boolean>,
    private enderecoService: EnderecoService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (this.data.fabricante?.id)
      this.fabricantesService
        .getById(this.data.fabricante.id)
        .subscribe((fabricante) => (this.fabricante = fabricante));
    else
      this.fabricante = {
        telefones: [{ numero: '' }, { numero: '' }],
        endereco: {},
      };
  }

  getCep() {
    if (!this.fabricante.endereco?.codigoPostal) return;

    this.enderecoService
      .getAddressByCodigoPostal(this.fabricante.endereco.codigoPostal)
      .subscribe({
        next: (endereco) => (this.fabricante.endereco = endereco),
        error: () => (this.cepNaoEncontrado = true),
      });
  }

  salvarFabricante(form: FormComponent) {
    if (!form.valid()) return;
    load.show();
    this.fabricantesService.save(this.fabricante).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          'Fabricante ' +
            (!this.fabricante.id ? 'cadastrado' : 'editado') +
            ' com sucesso'
        );
        this.dialogRef.close(true);
      },
      error: (error) => {
        load.hide();
        this.modalService.error(error);
      },
    });
  }
}
