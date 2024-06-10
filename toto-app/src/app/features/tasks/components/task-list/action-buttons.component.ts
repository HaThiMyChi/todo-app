import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-buttons',
  template: `
    <button mat-button (click)="editTask()">Edit</button>
    <button mat-button (click)="deleteTask()">Delete</button>
  `
})
export class ActionButtonsComponent implements ICellRendererAngularComp {
  private params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  editTask() {
    this.params.context.componentParent.editTask(this.params.data);
  }

  deleteTask() {
    this.params.context.componentParent.deleteTask(this.params.data);
  }
}