import { GestoesService } from './../../../../../../apps/sigma/src/app/administrativo/gestoes/shared/gestoes.service';
import { Gestao } from './../../../../../../apps/sigma/src/app/administrativo/gestoes/shared/gestao';
import { PerfilService } from '@shared/services/perfil.service';
import { ModalService } from '@shared/components/modal/modal.service';
import { Item } from '@shared/models/item.model';
import { UsuariosService } from './../shared/usuarios.service';
import { FormComponent } from '@shared/components/form/form.component';
import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../shared/usuario';
import { load } from '@core/utils/load/load.component';
import { SharedModule } from '@shared/shared.module';
import { Perfil } from '@shared/models/perfil';
import { UsuarioSimplificado } from '../shared/usuario-simplificado';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  public usuario: Usuario = {} as Usuario;

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
    load.show();
    this.usuariosService.save(this.usuario).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          `Usuário ${!this.usuario.id ? 'cadastrado' : 'editado'} com sucesso`
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
