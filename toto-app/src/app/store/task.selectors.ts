import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task } from '../core/models/task.model';

export const selectTaskState = createFeatureSelector<Task[]>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (tasks: Task[]) => tasks
);