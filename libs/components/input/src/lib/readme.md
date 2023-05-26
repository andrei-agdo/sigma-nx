# Formulário e inputs

(shared/components/input)

- o input e form estão dinâmicos com várias propriedades com vários cenários reativos
  Utilização:
  Form:
  HTML:

<sigma-nx-form #form>
<button (click)="login(form)">Entrar</button> //pode ser dentro ou fora do form
</sigma-nx-form>

TS:
login(form: FormComponent) {
if (form.valid())) ...
}

- Input:
  <sigma-nx-input
  id='1' //identificação do campo
  class='classe' //  customização no arquivo "core/scss/input-theme.scss"
  type="email" // pode ser 'text'| 'password'| 'email'| 'date'| 'number'| 'combo'| 'time'| 'color'| 'autocomplete'
  mask='' // DOC: https://www.npmjs.com/package/ngx-mask
  label="Email" // Label do campo
  placeholder="Insira seu Email"//placehoolder do campo

  [(ngModel)]='' // ngModel

  (search)='pesquisa($event) //seach ( para pesquisa de 'autocomplete')

  [options]='options' // array de valores para os tipos 'combo' e 'autocomplete'
  [optionLabel]='value' // qual o campo deve exibir nos tipos 'combo' e 'autocomplete'

  required //se é obrigatório
  validateName // validador de nome (mínimo de 2 nomes com 2 caracteres)
  minLength //valor mínimo de caracteres
  maxLength // valor máximo de caracteres

  - todos os validadores podem ser dinamicos usando [ ]
  - EX: [required]='documento.name == "RG"'

  align='left' // alinhamento do texto interno

  [compareWith]='compareFn' // DOC: https://material.angular.io/components/select/overview
  [displayWith]='displayWithFn' // DOC: https://material.angular.io/components/autocomplete/overview

  disabled // se ativo ou desativo
  [disabled]='false' // alternativa com validação externa

  [appearance]='outline' // DOC: https://material.angular.io/components/form-field/overview

  (input)='$event' // ao digitar qualquer coisa

  [error]="boolean" // qualquer condição para mostrar o error no componente
  >

      <div required>Insira seu email</div> //erro pra se é obrigatório
      <div validateName>Insira seu nome corretamente</div> //erro pra se é nome inválido
      <div minLength>poucos caracteres</div> //erro pra se é minLength
      <div maxLength>muitos caracteres</div> //erro pra se é maxLength
      <div email>Insira um email válido</div> //erro pra se é email inválido
      <div error>{{ error.erroEmail }}</div> //erro genérico ( com a propriedade "error" como true)

      <div prefix>R$</div>// texto fixo antes do campo
      <div suffix>,00</div>// texto fixo depois do campo

      <div hint>Coloque tal informação</div> //hint abaixo do campo

      // autocomplete e combo custom:
      <ng-template #itemTemplate let-option> // let-(qualquer coisa)
             {{ option.name }} //qualquer HTML, incluindo imagens
      </ng-template>

  </sigma-nx-input>
