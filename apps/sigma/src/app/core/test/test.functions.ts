import { Observable } from 'rxjs';

export function checkPropertys(obj: any, propertys: string[]) {
  let actual = Object.keys(obj).sort();
  let expected = propertys.sort();

  return expect(actual).toEqual(expected);
}

export function checkRequiredProperty(obj: any, propertys: string[]) {
  let expected = propertys.sort();

  for (let field of expected) {
    expect(obj[field])
      .withContext('Propriedade ' + field + ' é obrigatória mas veio vazia')
      .not.toBeUndefined();
  }
}

// função para testar a edição de uma propriedade

export default function checkChange(request: {
  service: {
    getById: (arg0: string) => Observable<any>;
    save: (arg0: any) => Observable<any>;
  };
  entidade: any;
  prop: string;
  newValue: unknown;
}): Observable<any> {
  let entidade = { ...request.entidade };
  return new Observable<any>((observer) => {
    console.log(
      'Propriedade "' + request.prop + '" atual:',
      entidade[request.prop]
    );

    let oldValue = entidade[request.prop];

    entidade[request.prop] = request.newValue;
    request.service.save(entidade).subscribe({
      next: (data: boolean) => {
        expect(data)
          .withContext('Não foi possível editar ' + request.prop)
          .toBeTrue();

        request.service.getById(entidade.id).subscribe((data: any) => {
          expect(data[request.prop])
            .withContext(request.prop + ' não foi alterado')
            .toEqual(request.newValue);

          console.log(
            'Propriedade "' + request.prop + '" atualizada:',
            data[request.prop]
          );

          entidade[request.prop] = oldValue;
          request.service.save(entidade).subscribe({
            next: (data: boolean) => {
              expect(data)
                .withContext('Não foi possível editar ' + request.prop)
                .toBeTrue();

              observer.next();
              observer.complete();
            },
          });
        });
      },
      error: (error: any) => {
        observer.error(error?.error?.errors[0].message || error);
        observer.complete();
      },
    });
  });
}


//checar se todos os valores de uma lista são iguais ao valor pesquisado
export function checkAllValues(
  array: any[],
  prop: string = '',
  searchValue: string | number | boolean | undefined
): boolean {
  if (typeof searchValue === 'string') {
    return array.every((item) =>
      item[prop]
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  }

  if (typeof searchValue === 'number') {
    return array.every((item) => item[prop] === searchValue);
  }

  if (typeof searchValue === 'boolean') {
    return array.every((item) => item[prop] === searchValue);
  }

  return false;
}

export function checkAtualizarAtivo(
  entidade: any & { id: string },
  service: {
    getById: (arg0: any) => Observable<any>;
    save: (arg0: any) => Observable<any>;
    atualizarAtivo: (arg0: any) => Observable<any>;
  }
) {
  return new Observable<any>((observer) => {
    service.getById(entidade.id).subscribe({
      next: (entity) => {
        expect(entity.ativo).toBeTrue();
        service.atualizarAtivo(entity).subscribe({
          next: (success) => {
            expect(success)
              .withContext('Não foi possível ativar a entidade')
              .toBeTrue();
            service.getById(entity.id).subscribe({
              next: (entidade) => {
                expect(entidade.ativo)
                  .withContext('A entidade não foi desativada')
                  .toBeFalse();
                service.atualizarAtivo(entidade).subscribe({
                  next: (success) => {
                    expect(success)
                      .withContext('Não foi possível ativar a entidade')
                      .toBeTrue();
                    service.getById(entidade.id).subscribe({
                      next: (entidade) => {
                        expect(entidade.ativo)
                          .withContext('A entidade não foi desativada')
                          .toBeTrue();
                        observer.next(true);
                        observer.complete();
                      },
                      error: (error: any) => {
                        observer.next(false);
                        observer.complete();
                      },
                    });
                  },
                  error: (error: any) => {
                    observer.next(false);
                    observer.complete();
                  },
                });
              },
              error: (error: any) => {
                observer.next(false);
                observer.complete();
              },
            });
          },
          error: (error: any) => {
            observer.next(false);
            observer.complete();
          },
        });
      },
      error: (error: any) => {
        observer.next(false);
        observer.complete();
      },
    });
  });
}
