import { TablePagination } from './models/table-pagination.model';
import {
  state,
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { TableItemDirective } from './components/table-item.directive';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { TableHeaderComponent } from './components/header.component';
import { TableItemExpandedDirective } from './components/expanded-item.directive';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'sigma-nx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),

      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),

    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('400ms', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class TableComponent {
  ///////////////////////////////////////////////////
  //Props públicas
  ///////////////////////////////////////////////////

  //Quantidades de itens totais
  @Input() length: number = 0;

  // opções de itens por pagina
  @Input() pageSizeOptions = [10, 25, 50];

  // Exibir painel de detalhes ao clicar na linha
  @Input() expandItemOnClick: boolean | string = false;

  @Input() hidePaginator: boolean = false;

  // variavel pra atribuir o objeto a ser expandido

  //array de itens ( o array deve ter a quantidade igual de pageSize)
  @Input() public get data(): unknown[] {
    return this._data?.filter((x) => x) || [];
  }
  public set data(v: unknown[] | undefined) {
    this._data = v || [];
    this.dataSource = new MatTableDataSource(this.data);
  }

  public expandRow(row: unknown): void {
    this.expandedRow = row !== this.expandedRow && row;
  }

  @Input()
  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };
  @Output() pageChange = new EventEmitter<TablePagination>();

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  protected expandedRow: unknown;

  @ContentChildren(TableHeaderComponent)
  protected headers: QueryList<TableHeaderComponent> =
    new QueryList<TableHeaderComponent>();

  @ContentChildren(TableItemDirective, { descendants: true })
  protected bodys: QueryList<TableItemDirective> =
    new QueryList<TableItemDirective>();

  @ContentChild(TableItemExpandedDirective, { descendants: true })
  protected expandedItem?: TableItemExpandedDirective;

  protected displayedColumns: string[] = [];

  private _data: unknown[];

  @ViewChild(MatPaginator) private paginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort) private sort: MatSort;

  protected dataSource: MatTableDataSource<unknown>;

  protected headerProcessed: TableHeaderComponent[];
  protected bodysProcessed: TableItemDirective[] = [];

  constructor(private cd: ChangeDetectorRef) { }

  protected ngOnInit(): void {
    this.expandItemOnClick = this.expandItemOnClick === '';
    this.dataSource = new MatTableDataSource(this.data);
  }

  protected clickItem(item: TableHeaderComponent) {
    item.clickEvent();
  }

  protected handlePageEvent(e: PageEvent) {
    this.page = e;
    this.pageChange.emit({
      pageIndex: e.pageIndex,
      pageSize: e.pageSize,
    });
  }

  protected ngAfterViewInit() {
    queueMicrotask(() => {
      this.bodysProcessed = this.bodys.map((body) => body);
      this.headerProcessed = this.headers.map((header) => header);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.displayedColumns = this.headerProcessed.map(
        (header, index) =>
          header.content?.nativeElement.innerHTML || 'col-' + index
      );

      this.cd.detectChanges()
    });
  }
}
