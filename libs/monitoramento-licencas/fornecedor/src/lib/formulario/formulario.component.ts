
import { FormComponent } from '@sigma-nx/components/input';
import { ModalService } from '@sigma-nx/services/modal';
import { FornecedorService } from './../shared/fornecedor.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fornecedor } from './../shared/fornecedor';
import { FormularioModule } from '@sigma-nx/shared';
import { Component, Inject } from '@angular/core';
import { EnderecoService } from '@sigma-nx/shared';
@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [FormularioModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  public fornecedor: Fornecedor = {
    telefones: [{ numero: '' }, { numero: '' }],
    endereco: {},
  };

  public cepNaoEncontrado = false;

  public estados = this.enderecoService.getEstados();

  public get telefone(): string {
    if (!this.fornecedor.telefones) return '';
    return this.fornecedor.telefones[0].numero;
  }

  public set telefone(v: string) {
    if (!this.fornecedor.telefones) this.fornecedor.telefones = [];
    this.fornecedor.telefones[0].numero = v;
  }

  public get celular(): string {
    if (!this.fornecedor.telefones) return '';
    return this.fornecedor.telefones[1].numero;
  }

  public set celular(v: string) {
    if (!this.fornecedor.telefones) this.fornecedor.telefones = [];
    this.fornecedor.telefones[1].numero = v;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { fornecedor?: Fornecedor },
    private fornecedoresService: FornecedorService,
    private enderecoService: EnderecoService,
    private dialogRef: MatDialogRef<FormularioComponent, boolean>,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    if (this.data.fornecedor?.id)
      this.fornecedoresService
        .getById(this.data.fornecedor.id)
        .subscribe((fornecedor) => (this.fornecedor = fornecedor));
  }

  getCep() {
    if (!this.fornecedor.endereco?.codigoPostal) return;

    this.enderecoService
      .getAddressByCodigoPostal(this.fornecedor.endereco.codigoPostal)
      .subscribe({
        next: (endereco) => (this.fornecedor.endereco = endereco),
        error: () => (this.cepNaoEncontrado = true),
      });
  }

  salvarFornecedor(form: FormComponent) {
    if (!form.valid()) return;

    this.fornecedoresService.save(this.fornecedor).subscribe({
      next: () => {

        this.modalService.success(
          'Fornecedor ' +
          (!this.fornecedor.id ? 'cadastrado' : 'editado') +
          ' com sucesso'
        );
        this.dialogRef.close(true);
      },
      error: (error) => {

        this.modalService.error(error);
      },
    });
  }
}
