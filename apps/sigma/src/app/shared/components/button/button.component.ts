import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sigma-nx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public color: 'primary' | 'secondary' = 'secondary';
  @Input() width: string = '100%';
  @Input() disabled: boolean = false;
}
