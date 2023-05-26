import { FormularioModule, PerfilService } from '@sigma-nx/shared';
import { ModalService } from '@sigma-nx/services/modal';
import { Gestao } from '@sigma-nx/administrativo/gestoes';
import { GestoesService } from '@sigma-nx/administrativo/gestoes';
import { Item } from '@sigma-nx/shared';
import { UsuariosService } from './../shared/usuarios.service';
import { FormComponent } from '@sigma-nx/components/input';
import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../shared/usuario';
import { Perfil } from '@sigma-nx/shared';
import { UsuarioSimplificado } from '../shared/usuario-simplificado';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [FormularioModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  public usuario: Usuario;

  public perfis$: Observable<Perfil[]> = new Observable<Perfil[]>();
  public modulos$: Observable<Item[]> = new Observable<Item[]>();
  public gestao$: Observable<Gestao[]> = new Observable<Gestao[]>();

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { usuario?: UsuarioSimplificado },
    private usuariosService: UsuariosService,
    private gestoesService: GestoesService,
    private dialogRef: MatDialogRef<FormularioComponent>,
    private modalService: ModalService,
    private perfilService: PerfilService
  ) { }

  ngOnInit(): void {
    this.perfis$ = this.perfilService.get();

    this.modulos$ = this.usuariosService.getModulos();

    this.gestao$ = this.gestoesService.get();

    if (this.data.usuario?.id)
      this.usuariosService
        .getById(this.data.usuario.id)
        .subscribe((usuario) => (this.usuario = usuario));
    else
      this.usuario = {
        email: '',
        perfilId: '',
        modulosId: [],
      };
  }

  setTelefone(numero: string) {
    if (!this.usuario.telefone?.numero) this.usuario.telefone = { numero: '' };

    this.usuario.telefone.numero = numero;
  }

  salvarUsuario(form: FormComponent) {
    if (!form.valid()) return;
    this.usuariosService.save(this.usuario).subscribe({
      next: () => {
        this.modalService.success(
          `Usuário ${!this.usuario.id ? 'cadastrado' : 'editado'} com sucesso`
        );
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.modalService.error(error);
      },
    });
  }
}
