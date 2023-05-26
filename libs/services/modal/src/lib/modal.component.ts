import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sigma-nx-modal',
  templateUrl: './modal.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; image: string }
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 5000);
  }
}
