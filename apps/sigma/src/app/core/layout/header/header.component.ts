import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable, of } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HeaderService } from './header.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
@Component({
  selector: 'sigma-nx--header',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public nameInitials$: Observable<string> = new Observable();

  @Input() menuState = false;

  @Output() menuStateChange = new EventEmitter();

  public isMobile = false;

  constructor(
    private headerService: HeaderService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  ngOnInit() {
    this.nameInitials$ = of('AA');
  }

}
