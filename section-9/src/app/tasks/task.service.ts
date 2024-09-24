import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

// Tells Angular this class can be injected into any component/directive/service anywhere in our application
@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: {title: string; description: string}) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN'
    }
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
  }
}
