import { TableItemDirective } from './table-item.directive';
import { Directive } from '@angular/core';

@Directive({
  selector: '[expandedItem]',
})
export class TableItemExpandedDirective extends TableItemDirective {}
