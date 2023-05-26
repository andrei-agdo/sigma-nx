import { ModalService } from '@sigma-nx/services/modal';
import { TemasService } from './../shared/temas.service';
import { FormComponent } from '@sigma-nx/components/input';
import { Tema } from '../shared/tema';
import { MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';
import {
  Component,
  Inject
} from '@angular/core';
import { FormularioModule } from '@sigma-nx/shared';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [FormularioModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  public tema: Tema;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { tema?: Tema },
    private temasService: TemasService,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<FormularioComponent, boolean>
  ) { }

  ngOnInit(): void {
    if (this.data.tema?.id)
      this.temasService
        .getById(this.data.tema.id)
        .subscribe((tema) => (this.tema = tema));
    else this.tema = {};
  }

  salvarTema(form: FormComponent) {
    if (!form.valid()) return;
    this.temasService.save(this.tema).subscribe({
      next: () => {
        this.modalService.success(
          'Tema ' + (!this.tema.id ? 'cadastrado' : 'editado') + ' com sucesso'
        );
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.modalService.error(error);
      },
    });
  }
}
