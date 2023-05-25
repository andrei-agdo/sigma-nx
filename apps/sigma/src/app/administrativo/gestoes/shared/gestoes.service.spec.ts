import { TestBed } from '@angular/core/testing';

import { TestModule } from '@core/test/test.module';

import { GestoesService } from './gestoes.service';
import { Gestao } from './gestao';
import checkChange, {
  checkAtualizarAtivo,
  checkPropertys,
} from '@core/test/test.functions';

describe('3.2.	Story user CRUD de Gestão ', () => {
  let service: GestoesService;
  let random = Math.random().toString(36).substring(2, 8).toUpperCase();
  let newRandom = Math.random().toString(36).substring(2, 8).toUpperCase();
  let gestao: Gestao = {};

  afterAll((done) => {
    service.atualizarAtivo(gestao).subscribe(() => {
      console.log('Finalizado teste de gestões');
      done();
    });
  });

  beforeAll((done) => {
    console.log('Iniciado teste de gestões');
    TestBed.configureTestingModule({
      imports: [TestModule],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(GestoesService);
    const _gestao: Gestao = {
      nome: 'Gestão de Teste ' + random,
      ativo: true,
      unidadeId: 'a4895a99-395b-4d97-8a0a-4528601eaa5d',
    };
    service.save(_gestao).subscribe(() =>
      service.get({ nome: _gestao.nome }).subscribe((gestoes) => {
        gestao = gestoes[0];
        done();
      })
    );
  });

  describe('Tenha em sua tela de busca:', () => {
    describe('Um filtro por busca com opções:', () => {
      it('Nome', (done) => {
        service.get({ nome: random }).subscribe((gestao) => {
          expect(gestao.length)
            .withContext('Não foi encontrado nenhum usuario com o nome')
            .toBeGreaterThan(0);

          done();
        });
      });
    });
    describe('Na busca de gestões ', () => {
      it('Tenham as colunas de nome e identificação de ativo e opções de ações', (done) => {
        service.get().subscribe((gestoes) => {
          expect(Array.isArray(gestoes))
            .withContext('Necessário trazer um array')
            .toBeTruthy();

          // Neste caso, a coluna id é para a opção de ações

          let _fields = ['id', 'nome', 'ativo', 'unidadeId'];

          gestoes.forEach((gestao) => {
            checkPropertys(gestao, _fields);
          });

          done();
        });
      });
    });
  });

  describe('Em opções de ações seja possível:', () => {
    it('Alterar as informações de “Ativo”', (done) => {
      checkAtualizarAtivo(gestao, service).subscribe((success) => {
        expect(success).toBeTrue();
        done();
      });
    });
  });

  describe('Que tenha no modal de informações da gestão:', () => {
    describe('Os campos preenchidos de:', () => {
      it('checagem de campos', (done) => {
        service.getById(gestao.id!).subscribe((gestao) => {
          let _fields = ['id', 'nome', 'ativo', 'unidadeId'];
          checkPropertys(gestao, _fields);
          done();
        });
      });

      it('Nome', (done) => {
        checkChange({
          prop: 'nome',
          newValue: 'Gestão de Teste editada ' + newRandom,
          service,
          entidade: gestao,
        }).subscribe({
          next: () => {
            done();
          },
          error: (e: any) => {
            done.fail(e);
          },
        });
      });

      it('Status', (done) => {
        checkChange({
          prop: 'ativo',
          newValue: true,
          service,
          entidade: gestao,
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

    describe('Os campos sejam obrigatórios:', () => {
      it('Nome', (done) => {
        let _gestao: Gestao = {
          nome: '',
          ativo: false,
          unidadeId: 'a4895a99-395b-4d97-8a0a-4528601eaa5d',
        };

        service.save(_gestao).subscribe({
          next: () => {
            done.fail('Não deveria salvar sem nome');
          },
          error: (e: any) => {
            expect(e.error.errors[0].message).toContain('Nome');
            done();
          },
        });
      });
    });

    it('Receber uma mensagem de sucesso após a alteração com sucesso', (done) => {
      service.save(gestao).subscribe((success) => {
        expect(success).withContext('Erro ao salvar gestão').toBeTruthy();
        done();
      });
    });
  });

  describe('Seja possível cadastrar uma Gestão', () => {
    it('Com os campos obrigatórios preenchidos', (done) => {
      let _gestao: Gestao = {
        nome: 'Gestão de Teste ' + newRandom,
        ativo: false,
        unidadeId: 'a4895a99-395b-4d97-8a0a-4528601eaa5d',
      };

      service.save(_gestao).subscribe((success) => {
        expect(success).withContext('Erro ao salvar gestão').toBeTruthy();
        done();
      });
    });
  });
});
