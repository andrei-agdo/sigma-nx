import { ModalService } from '@shared/components/modal/modal.service';
import { TemasService } from './../shared/temas.service';
import { load } from '@core/utils/load/load.component';
import { FormComponent } from '@sigma-nx/components/input';
import { Tema } from '../shared/tema';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Component,
  Inject
} from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  public tema: Tema;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { tema?: Tema },
    private temasService: TemasService,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<FormularioComponent,boolean>
  ) {}

  ngOnInit(): void {
    if (this.data.tema?.id)
      this.temasService
        .getById(this.data.tema.id)
        .subscribe((tema) => (this.tema = tema));
    else this.tema = {};
  }

  salvarTema(form: FormComponent) {
    if (!form.valid()) return;
    load.show();
    this.temasService.save(this.tema).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          'Tema ' + (!this.tema.id ? 'cadastrado' : 'editado') + ' com sucesso'
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
