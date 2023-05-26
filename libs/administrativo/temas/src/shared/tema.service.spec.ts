import { TestBed } from '@angular/core/testing';

import { TestModule } from '@core/test/test.module';
import checkChange, {
  checkAllValues,
  checkAtualizarAtivo,
  checkPropertys,
  checkRequiredProperty,
} from '@core/test/test.functions';
import { TemasService } from './temas.service';
import { Tema } from './tema';

describe('3.4.	Story user CRUD de Tema', () => {
  let service: TemasService;
  let tema: Tema = {} as Tema;
  let random = Math.random().toString(36).substring(2, 8).toUpperCase();
  let newRandom = Math.random().toString(36).substring(2, 8).toUpperCase();

  afterAll((done) => {
    service.atualizarAtivo(tema).subscribe(() => {
      console.log('Finalizado teste de temas');
      done();
    });
  });

  beforeAll((done) => {
    console.log('Iniciado teste de temas');
    TestBed.configureTestingModule({
      imports: [TestModule],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(TemasService);
    const _tema: Tema = {
      nome: 'Tema de Teste ' + random,
      ativo: true,
      unidadeId: 'a4895a99-395b-4d97-8a0a-4528601eaa5d',
    };

    service.save(_tema).subscribe(() =>
      service.get({ nome: random }).subscribe((temas) => {
        service.getById(temas[0].id!).subscribe((temaFinal) => {
          tema = temaFinal;
          done();
        });
      })
    );
  });

  describe('Tenha em sua tela de busca:', () => {
    describe('Um filtro por busca com as opções:', () => {
      it('Nome', (done) => {
        service.get({ nome: tema.nome }).subscribe((temas) => {
          expect(temas.length)
            .withContext('Não foi possível filtrar por nome')
            .toBeGreaterThan(0);

          expect(checkAllValues(temas, 'nome', tema.nome))
            .withContext('Trouxe valores que não correspondem ao filtro')
            .toBeTrue();
          done();
        });
      });

      it('Número da pasta', (done) => {
        service.get({ numeroPasta: tema.numeroPasta }).subscribe((temas) => {
          expect(temas.length).withContext('Trouxe mais de um tema').toEqual(1);

          expect(checkAllValues(temas, 'numeroPasta', tema.numeroPasta))
            .withContext('Trouxe valores que não correspondem ao filtro')
            .toBeTrue();

          done();
        });
      });
    });

    describe('Na busca/No momento que carregar a tela, tenham as colunas:', () => {
      it('nome, n° de pasta, identificação de ativo e opções de ações', (done) => {
        service.get().subscribe((temas) => {
          temas.forEach((tema) => {
            checkPropertys(tema, [
              'id',
              'nome',
              'numeroPasta',
              'ativo',
              'unidadeId',
            ]);
          });

          done();
        });
      });
    });
  });
});
