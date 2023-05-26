import { load } from '@core/utils/load/load.component';
import { FormComponent } from '@sigma-nx/components/input';
import { ModalService } from '@shared/components/modal/modal.service';
import { OrgaoControleService } from './../shared/orgao-controle.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrgaoControle } from './../shared/orgao-controle';
import { SharedModule } from '@shared/shared.module';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [SharedModule],
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
    load.show();
    this.orgaoControleService.save(this.orgaoControle).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          'Órgão de Controle ' +
            (!this.orgaoControle.id ? 'cadastrado' : 'editado') +
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
