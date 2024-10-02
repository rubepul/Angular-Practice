import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// Tells Angular this class can be injected into any component/directive/service anywhere in our application
@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: {title: string; description: string}) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN'
    }
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('ADDED TASK with title ' + taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => oldTasks.map(
      (task) => task.id === taskId ? {...task, status: newStatus} : task
    ));
    this.loggingService.log('CHANGE TASK STATUS TO ' + newStatus);

  }
}
