import { createReducer, on } from '@ngrx/store';
import { Task } from '../core/models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
};

const _taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks })),
  on(TaskActions.addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(TaskActions.updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t))
  })),
  on(TaskActions.deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== id)
  }))
);

export function taskReducer(state: TaskState | undefined, action: any) {
  return _taskReducer(state, action);
}