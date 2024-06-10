// src/app/components/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../../../../core/models/task.model';
import { selectAllTasks } from '../../../../store/task.selectors';
import * as TaskActions from '../../../../store/task.actions'
import { ActionButtonsComponent } from './action-buttons.component';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> = of([]);

  columnDefs = [
    { headerName: 'Title', field: 'title', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Due Date', field: 'dueDate', sortable: true, filter: true },
    { headerName: 'Priority', field: 'priority', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: 'actionButtonsComponent'
    }
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true
  };

  frameworkComponents = {
    actionButtonsComponent: ActionButtonsComponent
  };

  constructor(private store: Store, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
    this.tasks$ = this.store.select(selectAllTasks);
  }

  addTask() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '250px',
      data: { task: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(TaskActions.addTask({ task: result }));
      }
    });
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '250px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(TaskActions.updateTask({ task: { ...task, ...result } }));
      }
    });
  }

  deleteTask(task: Task) {
    this.store.dispatch(TaskActions.deleteTask({ id: task.id }));
  }
}