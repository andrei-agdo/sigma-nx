/*

  Quer adicionar seu erro custom?

  <sigma-nx-input
  ...
  [error]="mensagemBackEnd"
  (input)='mensagemBackEnd = undefined'
  >
  <div error> {{mensagemBackEnd}} </div>
  </sigma-nx-input>

*/
import { AfterContentInit } from '@angular/core';

import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'sigma-nx-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: {
        overlayPanelClass: 'autocomplete-panel',
      },
    },
    {
      provide: MAT_SELECT_CONFIG,
      useValue: {
        overlayPanelClass: 'select-panel',
      },
    },
  ],
})
export class InputComponent implements ControlValueAccessor, AfterContentInit {
  @Input() public id: string = '';

  @Input() showErrorHint: boolean = true;
  @Input() hideHint = false;

  // customização no arquivo "core/scss/input-theme.scss"
  @Input() public class: string = '';

  @ContentChild('itemTemplate') itemTemplate?: TemplateRef<unknown>;

  @ContentChild('noItens') noItens?: TemplateRef<unknown>;

  @Input() public type:
    | 'text'
    | 'password'
    | 'email'
    | 'date'
    | 'number'
    | 'combo'
    | 'time'
    | 'color'
    | 'autocomplete'
    | 'textarea' = 'text';

  @Input() public color: 'primary' | 'accent' | 'warn' = 'primary'; // ngx-mask

  @Input() public mask = ''; // ngx-mask
  @Input() public thousandSeparator = '.';

  @Input() public label: string = '';
  @Input() public placeholder: string = '';

  @Input() public ngModel: unknown;
  @Output() public ngModelChange = new EventEmitter();

  @Output() public selectedOption = new EventEmitter();

  @Output() public search = new EventEmitter(); // o conteudo da pesquisa do autocomplete

  @Input() public options: any[] | null | undefined = []; // options para o combo e autocomplete
  @Input() public optionLabel = 'value';
  @Input() public optionValue?: string = undefined;
  @Input() public multiple: boolean = false;
  @Input() public disabledOptions: boolean = false; //desativar as opções do combo (mas mostrando ele)

  //Validadores
  @Input() public required: boolean | string = false; //se necessário

  @Input() public validateName: boolean | string = false; // se nome real

  @Input() public minLength: number | null = null;

  @Input() public maxLength: number | null = null;

  // alinhamento do texto interno
  @Input() public align: 'left' | 'right' | 'center' = 'left';

  // função do combo de comparação
  @Input() public compareWith = (op1: any, op2: any): boolean =>
    (op1?.id && op2?.id && op1?.id == op2?.id) ||
    (op1?._id && op2?._id && op1?._id == op2?._id) ||
    (op1 && op2 && op1 == op2); // mat combo

  // função do autocomplete de exibição
  @Input() public displayWith = (value: any): string => value?.name;

  // Propriedade pra desativar
  @Input() public disabled: boolean | string = false;
  @Input() public readonly: boolean | string = false;

  // Aparência: baseado no material design
  @Input() appearance: 'fill' | 'outline' = 'outline';

  // ao digitar qualquer coisa
  @Output() public input = new EventEmitter();

  @Output() public blur = new EventEmitter<void>();

  public formControl: FormControl = new FormControl();

  // mostrar erro custom
  private _error: boolean | any;
  public get error(): boolean | any {
    return this._error;
  }
  @Input() public set error(error: boolean) {
    this._error = error;
    if (error) {
      this.formControl.markAsTouched();
      queueMicrotask(() => {
        this.formControl.setErrors({ error: true });
      });
    }
  }

  @Output() public errorChange = new EventEmitter<boolean>();

  get _ngModel() {
    return this.ngModel;
  }
  set _ngModel(val) {
    if (val === undefined || val === null) return;
    this.ngModel = val;
    this.ngModelChange.emit(this.ngModel);
  }

  blurEvent() {
    this.formControl.markAsTouched();
    this.valid();
    this.blur.emit();
  }

  ngOnChanges(changes: any): void {
    if (changes.ngModel?.currentValue !== undefined)
      this.formControl.setValue(changes.ngModel.currentValue);
    this.valid();
    this.applyValidators();
  }

  ngAfterContentInit(): void {
    // a lib de máscara só funciona com tipo text
    if (this.mask) this.type = 'text';

    this.startVoidValidators();
    this.applyValidators();

    if (this.type !== 'autocomplete') {
      this.formControl.valueChanges.subscribe((value) => {
        this._ngModel = value;
      });
    }

    this.formControl.setValue(this._ngModel);

    if (this.type == 'autocomplete') {
      this.formControl.valueChanges
        .pipe(debounceTime(400))
        .subscribe((option) => {
          this.search.emit(option);
        });
    }
  }

  selectOption($event: any) {
    this._ngModel = $event.option.value;
  }

  selectOptionCombo(option: any) {
    this.selectedOption.emit(option);
  }

  writeValue(value: unknown) {
    this._ngModel = value;
  }

  onChange: unknown = () => { };
  public registerOnChange(fn: unknown) {
    this.onChange = fn;
  }

  onTouch: unknown = () => { };
  public registerOnTouched(fn: unknown) {
    this.onTouch = fn;
  }

  public checkError(field: string): boolean {
    if (this.formControl?.errors)
      return Object.keys(this.formControl.errors).includes(field);
    return false;
  }

  // Propriedade de verificação de validação
  public valid(): boolean {
    if (this.formControl.errors?.['error'])
      delete this.formControl.errors['error'];

    let _errors: any = { ...this.formControl.errors };
    // se error for "true" adiciona
    if (this.error) _errors.error = true;
    // se tem erros, avisa o formControl
    if (Object.keys(_errors).length > 0) this.formControl.setErrors(_errors);
    // Se não tem, limpa o erro do form
    else this.formControl.setErrors(null);

    return (
      (this.formControl.valid || this.formControl.disabled) &&
      (this.error === undefined || this.error === false)
    );
  }

  get errorsForm(): any {
    return this.formControl?.errors;
  }

  private startVoidValidators(): void {
    //verificação caso propriedade vazia, convertendo para true
    this.required = this.required === '';
    this.validateName = this.validateName === '';
    this.disabled = this.disabled === '';
    this.readonly = this.readonly === '';
  }

  private applyValidators(): void {
    let _validators = [];

    //validadores
    if (this.required) _validators.push(Validators.required);

    if (this.type == 'email') _validators.push(Validators.email);

    if (this.validateName) _validators.push(this.fullNameValidator);

    if (this.minLength)
      _validators.push(Validators.minLength(Number(this.minLength)));

    if (this.maxLength)
      _validators.push(Validators.maxLength(Number(this.maxLength)));

    if (!this.formControl) this.formControl = new FormControl('', _validators);
    else this.formControl.setValidators(_validators);

    if (this.disabled || this.disabled === '') this.formControl.disable();
    else this.formControl.enable();
  }

  private fullNameValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    let _error = { fullNameValidator: true };

    if (control.value === null) return _error;

    if (!control.value || control.value?.length === 0) return null;

    let names = control.value.split(' ');

    if (names.length < 2 || names.some((name: string) => name.length < 2))
      return _error;

    return null;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) this.formControl.disable();
  }
}
