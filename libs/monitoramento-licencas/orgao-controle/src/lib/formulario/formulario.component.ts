
import { FormComponent } from '@sigma-nx/components/input';
import { ModalService } from '@sigma-nx/services/modal';
import { OrgaoControleService } from './../shared/orgao-controle.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrgaoControle } from './../shared/orgao-controle';
import { FormularioModule } from '@sigma-nx/shared';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [FormularioModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  public orgaoControle: OrgaoControle;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { orgaoControle?: OrgaoControle },
    private orgaoControleService: OrgaoControleService,
    public dialogRef: MatDialogRef<FormularioComponent>,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (this.data.orgaoControle?.id)
      this.orgaoControleService
        .getById(this.data.orgaoControle.id)
        .subscribe((orgaoControle) => (this.orgaoControle = orgaoControle));
    else this.orgaoControle = {};
  }

  salvarOrgaoControle(form: FormComponent) {
    if (!form.valid()) return;

    this.orgaoControleService.save(this.orgaoControle).subscribe({
      next: () => {

        this.modalService.success(
          'Órgão de Controle ' +
            (!this.orgaoControle.id ? 'cadastrado' : 'editado') +
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
