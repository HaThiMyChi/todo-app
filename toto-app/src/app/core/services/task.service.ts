import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'assets/tasks.json';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  addTask(newTask: Task): Observable<Task[]> {
    return this.getTasks().pipe(
      map(tasks => {
        const maxId = Math.max(...tasks.map(task => task.id));
        newTask.id = maxId + 1;
        tasks.push(newTask);
        this.saveTasks(tasks);
        return tasks;
      })
    );
  }

  updateTask(updatedTask: Task): Observable<Task[]> {
    return this.getTasks().pipe(
      map(tasks => {
        const index = tasks.findIndex(task => task.id === updatedTask.id);
        tasks[index] = updatedTask;
        this.saveTasks(tasks);
        return tasks;
      })
    );
  }

  deleteTask(id: number): Observable<Task[]> {
    return this.getTasks().pipe(
      map(tasks => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        this.saveTasks(updatedTasks);
        return updatedTasks;
      })
    );
  }

  private saveTasks(tasks: Task[]): void {
    // In a real application, you would send a request to the server to save the data.
    // For this example, we'll log the data to the console.
    console.log('Saving tasks:', tasks);
  }
}