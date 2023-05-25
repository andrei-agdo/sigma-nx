import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'sigma-nx-form',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @ContentChildren(InputComponent, { descendants: true })
  inputs: QueryList<InputComponent> = new QueryList<InputComponent>();
  constructor(private appRef: ApplicationRef) {}

  public valid() {
    this.appRef.tick();

    if (!this.inputs) return false;
    return this.inputs
      .map((input) => {
        input.formControl.markAsTouched();
        return input;
      })
      .every((input) => input.valid());
  }

  errors(): string[] {
    if (!this.inputs) return [];

    let _errors: string[] = [];
    this.inputs
      .map((input) => {
        return input.errorsForm;
      })
      .filter((errors) => errors !== null)
      .map((error) => {
        return Object.keys(error).map((key) => {
          return key;
        });
      })
      .forEach((errors) => {
        _errors = _errors.concat(errors);
      });

    return _errors;
  }
}
