# componente de tabela

utilização:

<sigma-nx-table
#table
[data]='data' //array de dados (não é necessário fazer nenhum tratamento)
[length]="100" // tamanho TOTAL do array
(page)='trocaPagina($event)' // evento ao trocar de pagina ou tamanho
[pageSize]='10' //itens por página, padrão 10
[pageSizeOptions]='[10, 25, 50]' // opções de tamanho de página, caso alterado é chamado a função "page()"
expandItemOnClick // expandir o painel expansivo no clique geral da linha
[(page)]="page" // two way databind com o objeto com a pagina e quantidade por pagina
>

// padrão de cabeçalho

<div t-head>Nome da pessoa</div>

// padrão de item

<div *tableItem='let pessoa'>{{pessoa.nome}} </div> // o let pode ser qualquer coisa, representa o item exibido do array

// funções do t-head

<div t-head
      sort // representa que possui ordenador
      (click)='sortBy("pessoa")' // ao clicar no cabeçalho específico 
      sticky // fixar a visualização no inicio da coluna em questão ( mobile por exemplo, a coluna sempre será visível )
      stickyEnd // fixar a visualização no final
>Nome da pessoa</div>

// funções *tableItem

<div *tableItem='let pessoa; let index = index'
(click)="table.expandRow(item)" // caso queira expandir a coluna abaixo ao clicar em um botão ou ícone
>
{{pessoa.nome}} </div>
// let index = index; é o índice do item no array

// *expandedItem é uma div que é exibida ao clicar em alguma linha
// o 'let item' (que pode possuir qualquer nome) é o objeto da linha clicada
// a div é exibida abaixo da linha clicada
// só é necessário colocar 1 na tabela e ele se aplicará a todos

<div *expandedItem='let pessoa'>
  <img [src]='pessoa.imagem'/> {{ pessoa.nomeCompleto}}
</div>

</sigma-nx-table>


Exemplo:
<sigma-nx-table *ngIf="usuarios" [data]='usuarios.data' [length]="usuarios.count" (pageChange)='changePage($event)' [(page)]="page">

  <div t-head sticky sort (click)='sortBy("nome")'>Nome</div>
  <div *tableItem='let item'>{{item.nome}}</div>

  <div t-head sort (click)='sortBy("email")'>E-mail</div>
  <div *tableItem='let item'>{{item.email}}</div>

  <div t-head sort>Perfil</div>
  <div *tableItem='let item'>{{item.perfil?.descricao}}</div>

  <div t-head>Status</div>
  <div *tableItem='let item'>
    <mat-slide-toggle [checked]="item.ativo"></mat-slide-toggle>
  </div>

  <div t-head stickyEnd>Ação</div>
  <div *tableItem='let item' class="acoes">
    <button mat-mini-fab (click)='openUsuario(item)'>
      <mat-icon>edit</mat-icon>
    </button>
  </div>

  <div *expandedItem='let item'>
    {{item | json}}
  </div>
</sigma-nx-table>
