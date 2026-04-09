import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, DialogModule, ButtonModule],
  template: `
    <p-dialog
      [header]="header"
      [visible]="visible"
      [modal]="true"
      [draggable]="false"
      [resizable]="false"
      [style]="{ width: width }"
      (onHide)="visibleChange.emit(false)"
    >
      <ng-content />
      <ng-template pTemplate="footer">
        <ng-content select="[modal-footer]" />
      </ng-template>
    </p-dialog>
  `
})
export class AppModal {
  @Input() header = '';
  @Input() visible = false;
  @Input() width = '480px';
  @Output() visibleChange = new EventEmitter<boolean>();
}
