import { TestBed } from '@angular/core/testing';
import { forkJoin } from 'rxjs';
import { TestModule } from '@core/test/test.module';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario';
import checkChange, {
  checkAtualizarAtivo,
  checkPropertys,
  checkRequiredProperty
} from '@core/test/test.functions';
import { PerfilService } from '@shared/services/perfil.service';
import { GestoesService } from '../../gestoes/shared/gestoes.service';

describe('3.1.	Story user CRUD de usuários ', () => {
  let service: UsuariosService;
  let usuario: Usuario = {} as Usuario;
  let newUsuario: Usuario = {} as Usuario;
  let random = Math.random().toString(36).substring(2, 8).toUpperCase();
  let newRandom = Math.random().toString(36).substring(2, 8).toUpperCase();

  afterAll((done) => {
    service.atualizarAtivo(usuario).subscribe(() => {
      console.log('Finalizado teste de usuario');
      done();
    });
  });

  beforeAll((done) => {
    console.log('Iniciado teste de usuario');
    TestBed.configureTestingModule({
      imports: [TestModule],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(UsuariosService);

    forkJoin([
      TestBed.inject(PerfilService).get(),
      service.getModulos(),
      TestBed.inject(GestoesService).get({
        itensPorPagina: 2,
      }),
    ]).subscribe({
      next: (result: any[]) => {
        newUsuario = {
          nome: 'Usuario de Teste ' + newRandom,
          email: newRandom + '@teste.com',
          telefone: {
            numero: '1288888888',
            celular: true,
          },
          perfilId: result[0][1].id,
          modulosId: [result[1][1].id],
          gestoesId: [result[2][1].id],
        };

        const _usuario: Usuario = {
          nome: 'Usuario de Teste ' + random,
          email: random + '@teste.com',
          telefone: {
            numero: '12999999999',
            celular: true,
          },
          ativo: true,
          perfilId: result[0][0].id,
          modulosId: [result[1][0].id],
          gestoesId: [result[2][0].id],
        };

        service.save(_usuario).subscribe(() =>
          service.get({ email: random + '@teste.com' }).subscribe({
            next: (usuarios) => {
              service.getById(usuarios[0].id!).subscribe((usuarioFinal) => {
                usuario = usuarioFinal;
                done();
              });
            },
            error: (error) => done.fail('Erro ao criar usuario'),
          })
        );
      },
      error: (error) => done.fail('Erro ao obter infos para criar usuario'),
    });
  });

  describe('Tenha em sua tela de busca:', () => {
    describe('Um filtro por busca com as opções:', () => {
      it('Nome', (done) => {
        service
          .get({
            nome: random,
          })
          .subscribe((usuarios) => {
            expect(usuarios.length)
              .withContext('Não foi encontrado nenhum usuario com o nome')
              .toBeGreaterThan(0);

            done();
          });
      });

      it('E-mail', (done) => {
        service
          .get({
            email: random,
          })
          .subscribe((usuarios) => {
            expect(usuarios.length)
              .withContext('Não foi encontrado nenhum usuario com o email')
              .toBeGreaterThan(0);

            expect(usuarios.length)
              .withContext(
                'Foi encontrado mais de um usuario com o mesmo email'
              )
              .toEqual(1);

            done();
          });
      });

      it('Perfil', (done) => {
        service
          .get({
            perfilId: usuario.perfilId,
          })
          .subscribe((usuarios) => {
            expect(usuarios.length)
              .withContext('Não foi encontrado nenhum usuario com o perfil')
              .toBeGreaterThan(0);

            done();
          });
      });

      it('Não obter por email e desativo', (done) => {
        service
          .get({
            email: random,
          })
          .subscribe((usuarios) => {
            expect(usuarios.length > 0 && !usuarios[0].ativo)
              .withContext(
                'Foi encontrado algum usuario com o email e ativo, mas usuário está desativo'
              )
              .toBe(false);

            done();
          });
      });
    });

    describe('Na busca de Usuários/No momento que carregar a tela, tenham as colunas :', () => {
      it('Nome, E-mail, Perfil, identificação de ativo e opções de ações', (done) => {
        service.get().subscribe((usuarios) => {
          expect(Array.isArray(usuarios))
            .withContext('Necessário trazer um array')
            .toBeTruthy();

          // Neste caso, a coluna id é para a opção de ações

          let _fields = ['id', 'nome', 'email', 'ativo', 'perfil'];

          usuarios.forEach((usuario) => {
            checkPropertys(usuario, _fields);
          });

          done();
        });
      });
    });
  });

  describe('Em opções de ações seja possível:', () => {
    it('Alterar as informações de “Ativo”', (done) => {
      checkAtualizarAtivo(usuario, service).subscribe(() => {
        done();
      });
    });
  });

  describe('Seja possível cadastrar um Usuário através do botão de cadastro que abrirá um modal com as seguintes informações:', () => {
    describe('Os campos de sejam obrigatórios', () => {
      xit('Nome', (done) => {
        const _usuario: Usuario = {
          nome: '',
          perfilId: usuario.perfilId,
          modulosId: usuario.modulosId,
          ativo: false,
          email: random + '-sem-nome@teste.com',
        };

        service.save(_usuario).subscribe({
          next: (data) => done.fail('Criou usuario sem nome'),
          error: (e: any) => {
            expect(e.error.errors[0].message)
              .withContext('Não retornou erro de nome obrigatório')
              .toContain('Nome');
            done();
          },
        });
      });

      it('Perfil', (done) => {
        const _usuario: Usuario = {
          nome: 'Usuario de Teste ' + random,
          modulosId: usuario.modulosId,
          ativo: false,
          email: random + '-sem-perfil@teste.com',
          perfilId: '',
        };

        service.save(_usuario).subscribe({
          next: (data) => done.fail('Criou usuario sem perfil'),
          error: (e: any) => {
            expect(e.error.errors[0].message)
              .withContext('Não retornou erro de perfil obrigatório')
              .toBeTruthy();
            done();
          },
        });
      });

      it('Email', (done) => {
        const _usuario: Usuario = {
          nome: 'Usuario de Teste ' + random,
          perfilId: usuario.perfilId,
          modulosId: usuario.modulosId,
          ativo: false,
          email: '',
        };

        service.save(_usuario).subscribe({
          next: (data) => done.fail('Criou usuario sem email'),
          error: (e: any) => {
            expect(e.error.errors[0].message)
              .withContext('Não retornou erro de email obrigatório')
              .toContain('Email');
            done();
          },
        });
      });

      it('Módulos', (done) => {
        const _usuario: Usuario = {
          nome: 'Usuario de Teste ' + random,
          perfilId: usuario.perfilId,
          ativo: false,
          email: random + '-sem-modulo',
          modulosId: [],
        };

        service.save(_usuario).subscribe({
          next: (data) => done.fail('Criou usuario sem modulos'),
          error: (e: any) => {
            expect(e.error.errors[0].message)
              .withContext('Não retornou erro de modulos obrigatório')
              .toBeTruthy();
            done();
          },
        });
      });

      xit('O campo Telefone se torna obrigatório quando o campo Gestão for preenchido. ', (done) => {
        const _usuario: Usuario = {
          nome: 'Usuario de Teste ' + random,
          perfilId: usuario.perfilId,
          modulosId: usuario.modulosId,
          ativo: false,
          email: random + '-sem-telefone@teste.com',
          gestoesId: usuario.gestoesId,
        };

        service.save(_usuario).subscribe({
          next: (data) => done.fail('Criou usuario sem telefone'),
          error: (e: any) => {
            expect(e.error.errors[0].message)
              .withContext('Não retornou erro de telefone obrigatório')
              .toContain('Telefone');
            done();
          },
        });
      });
    });
    it('Os campos de sejam obrigatórios.', (done) => {

      const _usuario: Usuario = {
        nome: 'Usuario de Teste ' + newRandom,
        perfilId: usuario.perfilId,
        modulosId: usuario.modulosId,
        ativo: false,
        email: newRandom + '@teste.com',
      };

      service.save(_usuario).subscribe({
        next: (data) => {
          expect(data)
            .withContext('Não foi possível criar o usuário')
            .toBeTrue();
          done();
        },
        error: (e: any) => {
          done.fail(e.error.errors[0].message);
        },
      });
    });

    it('Não criar usuario com email repetido', (done) => {
      const _usuario: Usuario = {
        nome: 'Usuario de Teste ' + random,
        perfilId: usuario.perfilId,
        modulosId: usuario.modulosId,
        ativo: false,
        email: random + '@teste.com',
        telefone: {
          numero: '12999999999',
          celular: true,
        },
        gestoesId: newUsuario.gestoesId,
      };

      service.save(_usuario).subscribe({
        next: (data) => {
          done.fail('Criou usuario com email repetido');
        },
        error: (e: any) => {
          expect(e.error.errors[0].message)
            .withContext('Não retornou erro de email repetido')
            .toContain('e-mail');
          done();
        },
      });
    });

    it('Receber uma mensagem de sucesso após o cadastro com sucesso', (done) => {
      let _random = Math.random().toString(36).substring(2, 8).toUpperCase();

      const _usuario: Usuario = {
        nome: 'Usuario de Teste ' + _random,
        perfilId: usuario.perfilId,
        modulosId: usuario.modulosId,
        ativo: false,
        email: _random + '@teste.com',
        telefone: {
          numero: '12999999999',
          celular: true,
        },
        gestoesId: newUsuario.gestoesId,
      };

      service.save(_usuario).subscribe({
        next: (data) => {
          expect(data)
            .withContext('Não foi possível criar o usuário')
            .toBeTrue();

          done();
        },
        error: (e: any) => {
          done.fail(e.error.errors[0].message);
        },
      });
    });
  });

  describe('Que tenha no modal de alterações de informações do Usuário', () => {
    describe('Os campos preenchidos de:', () => {
      it('Checagem de campos', (done) => {
        service.getById(usuario.id!).subscribe((usuario) => {
          let _fields = [
            'id',
            'nome',
            'perfilId',
            'email',
            'modulosId',
            'gestoesId',
            'ativo',
            'telefone',
            'unidadeId'
          ];

          let _fieldsRequired = ['id', 'nome', 'perfilId', 'modulosId', 'ativo'];

          checkPropertys(usuario, _fields);
          checkRequiredProperty(usuario, _fieldsRequired);

          done();
        });
      });

      it('Nome', (done) => {
        checkChange({
          prop: 'nome',
          newValue: 'Usuario de Teste ' + newRandom,
          service,
          entidade: usuario,
        }).subscribe({
          next: () => {
            done();
          },
          error: (e: any) => {
            done.fail(e.error.errors[0].message);
          },
        });
      });

      xit('Email', (done) => {
        checkChange({
          prop: 'email',
          newValue: newRandom + '@teste.com',
          service,
          entidade: usuario,
        }).subscribe({
          next: () => {
            done();
          },
          error: (e: any) => {
            done.fail(typeof e == "string" ? e : e.error.errors[0].message);
          },
        });
      });

      it('Perfil', (done) => {
        checkChange({
          prop: 'perfilId',
          newValue: newUsuario.perfilId,
          service,
          entidade: usuario,
        }).subscribe({
          next: () => {
            done();
          },
          error: (e: any) => {
            done.fail(e.error.errors[0].message);
          },
        });
      });

      it('Módulos', (done) => {
        checkChange({
          prop: 'modulosId',
          newValue: newUsuario.modulosId,
          service,
          entidade: usuario,
        }).subscribe({
          next: () => {
            done();
          },
          error: (e: any) => {
            done.fail(e.error.errors[0].message);
          },
        });
      });

      it('Telefone', (done) => {
        checkChange({
          prop: 'telefone',
          newValue: {
            numero: '12999999998',
            celular: true,
            id: usuario.telefone?.id,
          },
          service,
          entidade: usuario,
        }).subscribe({
          next: () => {
            done();
          },
          error: (e: any) => {
            done.fail(e.error.errors[0].message);
          },
        });
      });

      it('Não editar telefone inválido usuario', (done) => {
        checkChange({
          prop: 'telefone',
          newValue: {
            numero: '1299999',
            celular: true,
            id: usuario.telefone?.id,
          },
          service,
          entidade: usuario,
        }).subscribe({
          next: () => {
            done.fail('Telefone de formato inválido não deveria ser aceito');
          },
          error: (e) => {
            expect(e)
              .withContext('Não foi retornada mensagem de erro')
              .toContain('formato aceito');

            done();
          },
        });
      });

      it('Gestões', (done) => {
        checkChange({
          prop: 'gestoesId',
          newValue: newUsuario.gestoesId,
          service,
          entidade: usuario,
        }).subscribe({
          next: () => {
            done();
          },
          error: (e: any) => {
            done.fail(e.error.errors[0].message);
          },
        });
      });

      it('Ativo usuario', (done) => {
        checkChange({
          prop: 'ativo',
          newValue: true,
          service,
          entidade: usuario,
        }).subscribe({
          next: () => {
            done();
          },
          error: (e: any) => {
            done.fail(e.error.errors[0].message);
          },
        });
      });
    });

    it('Um botão de “Salvar”', () => {
      expect(service.save).toBeDefined();
    });

    describe('Os campos sejam obrigatórios:', () => {
      it('Nome', (done) => {
        checkChange({
          prop: 'nome',
          newValue: '',
          service,
          entidade: usuario,
        }).subscribe({
          next: () => {
            done.fail('Não retornou erro de nome obrigatório');
          },
          error: (e: any) => {
            expect(e)
              .withContext('Não retornou erro de nome obrigatório')
              .toContain('Nome');
            done();
          },
        });
      });

      it('Email', (done) => {
        checkChange({
          prop: 'email',
          newValue: '',
          service,
          entidade: usuario,
        }).subscribe({
          next: () => {
            done.fail('Não retornou erro de email obrigatório');
          },
          error: (e: any) => {
            expect(e)
              .withContext('Não retornou erro de email obrigatório')
              .toContain('Email');
            done();
          },
        });
      });

      it('Módulos', (done) => {
        checkChange({
          prop: 'modulosId',
          newValue: [],
          service,
          entidade: usuario,
        }).subscribe({
          next: () => {
            done.fail('Não retornou erro de módulos obrigatório');
          },
          error: (e: any) => {
            expect(e)
              .withContext('Não retornou erro de módulos obrigatório')
              .toContain('Módulo');
            done();
          },
        });
      });
    });

    it('Receber uma mensagem de sucesso após a alteração com sucesso.', (done) => {
      service.save(usuario).subscribe({
        next: (data) => {
          expect(data)
            .withContext('Não retornou mensagem de sucesso')
            .toBeTrue();
          done();
        },
        error: (e: any) => {
          done.fail(e.error.errors[0].message);
        },
      });
    });
  });
});
