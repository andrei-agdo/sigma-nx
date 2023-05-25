import { TestBed } from '@angular/core/testing';

import { DepartamentosService } from './departamentos.service';

import { TestModule } from '@core/test/test.module';
import checkChange, {
  checkAllValues,
  checkAtualizarAtivo,
  checkPropertys,
  checkRequiredProperty,
} from '@core/test/test.functions';
import { Departamento } from './departamento';

describe('3.3.	Story user CRUD de Departamento ', () => {
  let service: DepartamentosService;
  let departamento: Departamento = {} as Departamento;
  let random = Math.random().toString(36).substring(2, 8).toUpperCase();
  let newRandom = Math.random().toString(36).substring(2, 8).toUpperCase();

  afterAll((done) => {
    service.atualizarAtivo(departamento).subscribe(() => {
      console.log('Finalizado teste de departamentos');
      done();
    });
  });

  beforeAll((done) => {
    console.log('Iniciado teste de departamentos');
    TestBed.configureTestingModule({
      imports: [TestModule],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(DepartamentosService);
    const _departamento = {
      nome: 'Departamento de Teste ' + random,
      codigo: random,
      ativo: true,
      unidadeId: 'a4895a99-395b-4d97-8a0a-4528601eaa5d',
    };
    service.save(_departamento).subscribe(() =>
      service.get({ codigo: random }).subscribe((departamentos) => {
        service.getById(departamentos[0].id!).subscribe((departamentoFinal) => {
          departamento = departamentoFinal;
          done();
        });
      })
    );
  });


  describe('Tenha em sua tela de busca:', () => {
    describe('Um filtro por busca com as opções:', () => {
      it('Nome', (done) => {
        service.get({ nome: departamento.nome }).subscribe((departamentos) => {
          expect(departamentos.length)
            .withContext('Não foi possível filtrar por nome')
            .toBeGreaterThan(0);
          done();
        });
      });
    });
  });

  describe('Tenha em sua tela de busca:', () => {
    describe('Um filtro por busca com as opções:', () => {
      it('Código', (done) => {
        service
          .get({ codigo: departamento.codigo })
          .subscribe((departamentos) => {
            expect(departamentos.length)
              .withContext('Não foi possível filtrar por código')
              .toBeGreaterThan(0);

            expect(checkAllValues(departamentos, 'codigo', departamento.codigo))
              .withContext('Trouxe valores que não correspondem ao filtro')
              .toBeTrue();

            done();
          });
      });

      it('Nome', (done) => {
        service.get({ nome: departamento.nome }).subscribe((departamentos) => {
          expect(departamentos.length)
            .withContext('Não foi possível filtrar por nome')
            .toBeGreaterThan(0);

          expect(checkAllValues(departamentos, 'nome', departamento.nome))
            .withContext('Trouxe valores que não correspondem ao filtro')
            .toBeTrue();
          done();
        });
      });

      it('Status', (done) => {
        service
          .get()
          .subscribe((departamentos) => {
            expect(departamentos.length)
              .withContext('Não foi possível filtrar por status')
              .toBeGreaterThan(0);

            expect(checkAllValues(departamentos, 'ativo', departamento.ativo))
              .withContext('Trouxe valores que não correspondem ao filtro')
              .toBeTrue();

            done();
          });
      });
    });

    describe('Na busca/No momento que carregar a tela, tenham as colunas:', () => {
      it('código do departamento, nome e identificação de ativo e opções de ações', (done) => {
        service.get().subscribe((departamentos) => {
          departamentos.forEach((departamento) => {
            checkPropertys(departamento, ['codigo', 'nome', 'ativo', 'id']);
          });

          done();
        });
      });
    });
  });

  describe('Em opções de ações seja possível:', () => {
    it('Alterar as informações de “Ativo”', (done) => {
      checkAtualizarAtivo(departamento, service).subscribe(() => {
        done();
      });
    });
  });

  describe('Que tenha no modal de informações do Departamento:', () => {
    describe('Os campos preenchidos de:', () => {
      it('Checagem de campos', (done) => {
        service.getById(departamento.id!).subscribe((departamento) => {
          let _fields = ['id', 'nome', 'ativo', 'codigo', 'unidadeId'];

          checkPropertys(departamento, _fields);

          done();
        });
      });

      it('Nome', (done) => {
        checkChange({
          prop: 'nome',
          newValue: 'Departamento de Teste ' + newRandom,
          service,
          entidade: departamento,
        }).subscribe({
          next: () => {
            done();
          },
          error: (e: any) => {
            done.fail(e.error.errors[0].message);
          },
        });
      });

      it('Código', (done) => {
        checkChange({
          prop: 'codigo',
          newValue: newRandom,
          service,
          entidade: departamento,
        }).subscribe({
          next: () => {
            done();
          },
          error: (e: any) => {
            done.fail(e.error.errors[0].message);
          },
        });
      });

      it('Status', (done) => {
        checkChange({
          prop: 'ativo',
          newValue: false,
          service,
          entidade: departamento,
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

    it('Os campos preenchidos ', (done) => {
      service.getById(departamento.id!).subscribe((departamento) => {
        let _fields = ['id', 'nome', 'ativo', 'codigo', 'unidadeId'];

        checkRequiredProperty(departamento, _fields);

        done();
      });
    });
  });

  describe('Seja possível cadastrar um Departamento através do botão de cadastro que abrirá um modal com as seguintes informações:', () => {
    it('Um botão de “Salvar”', () => {
      expect(service.save).toBeDefined();
    });

    describe('Os campos de sejam obrigatórios', () => {
      it('Nome', (done) => {
        const _departamento: Departamento = {
          nome: '',
          ativo: true,
          codigo: '123',
          unidadeId: 'a4895a99-395b-4d97-8a0a-4528601eaa5d',
        };

        service.save(_departamento).subscribe({
          next: (data) => done.fail('Criou departamento sem nome'),
          error: (e: any) => {
            expect(e.error.errors[0].message)
              .withContext('Não retornou erro de nome obrigatório')
              .toContain('Nome');
            done();
          },
        });
      });

      it('Código', (done) => {
        const _departamento: Departamento = {
          nome: 'Departamento',
          ativo: true,
          codigo: '',
          unidadeId: 'a4895a99-395b-4d97-8a0a-4528601eaa5d',
        };

        service.save(_departamento).subscribe({
          next: (data) => done.fail('Criou departamento sem nome'),
          error: (e: any) => {
            expect(e.error.errors[0].message)
              .withContext('Não retornou erro de nome obrigatório')
              .toContain('Codigo');
            done();
          },
        });
      });
    });
  });
});
