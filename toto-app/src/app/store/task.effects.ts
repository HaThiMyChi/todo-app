import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TaskService } from '../core/services/task.service';
import { loadTasks, loadTasksSuccess } from './task.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(loadTasks),
    mergeMap(() => this.taskService.getTasks().pipe(
      map(tasks => loadTasksSuccess({ tasks })),
      catchError(() => of({ type: '[Task] Load Tasks Failure' }))
    ))
  ));

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}
}