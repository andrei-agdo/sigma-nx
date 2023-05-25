/* eslint-disable */
import { TestBed } from '@angular/core/testing';
import { TestModule } from '@core/test/test.module';
import checkChange, {
  checkAtualizarAtivo,
  checkPropertys,
  checkRequiredProperty,
} from '@core/test/test.functions';
import { UsuariosService as Service } from './xxx.service';
import { Usuario as Interface } from 'xxx';

describe('0.x xxxxxxx', () => {
  let service: Service;
  let entidade: Interface = {} as Interface;
  let newEntidade: Interface = {} as Interface;
  let random = Math.random().toString(36).substring(2, 8).toUpperCase();
  let newRandom = Math.random().toString(36).substring(2, 8).toUpperCase();

  afterAll((done) => {
    service.atualizarAtivo(entidade).subscribe(() => {
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
    service = TestBed.inject(Service);


    newEntidade = {
      nome: 'Entidade de Teste ' + newRandom,

    };

    const _entidade: Interface = {
      nome: 'Entidade de Teste ' + random,
    };

    service.save(_entidade).subscribe(() =>
      service.get({ nome: random }).subscribe({
        next: (entidades) => {
          service.getById(entidades[0].id!).subscribe((entidadeFinal) => {
            entidade = entidadeFinal;
            done();
          });
        },
        error: () => done.fail('Erro ao criar entidade'),
      })
    );
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

    });

    describe('Na busca xxxxxxxxxx, tenham as colunas :', () => {
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
      checkAtualizarAtivo(entidade, service).subscribe(() => {
        done();
      });
    });
  });

  describe('Que tenha no modal de alterações de informações do Usuário', () => {
    describe('Os campos preenchidos de:', () => {
      it('Checagem de campos', (done) => {
        service.getById(entidade.id!).subscribe((usuario) => {
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
          entidade: entidade,
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
          entidade: entidade,
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

    });
  });
});
