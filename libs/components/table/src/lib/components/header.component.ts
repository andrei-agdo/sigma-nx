import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: '[t-head]',
  template: `<div #contentWrapper (click)="clickEvent()">
    <ng-content></ng-content>
  </div> `,
})
export class TableHeaderComponent {
  @Input() public sort: boolean | string = false;
  @Input() public sticky: boolean | string = false;
  @Input() public stickyEnd: boolean | string = false;

  @Output() click = new EventEmitter<void>();

  @ViewChild('contentWrapper') content?: ElementRef;

  ngOnInit(): void {
    this.sort = this.sort === '';
    this.sticky = this.sticky === '';
    this.stickyEnd = this.stickyEnd === '';
  }

  clickEvent() {
    this.click.emit();
  }
}
