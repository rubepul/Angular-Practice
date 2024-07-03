import { Injectable } from "@angular/core";
import { NewTaskData } from "./task/task.model"

// Useful for performing some operation or manages some data needed by one or more components
@Injectable({
    providedIn: 'root'
})
export class TasksService {

    private tasks = [
        {
          id: 't1',
          userId: 'u1',
          title: 'Master Angular',
          summary: 'Learn all the basic and advance features of Angular and how to apply them.',
          dueDate: '2025-12-31'
        },
        {
          id: 't2',
          userId: 'u3',
          title: 'Build first prototype',
          summary: 'Build a first protoype of the online shop website',
          dueDate: '2024-05-31'
        },
        {
          id: 't3',
          userId: 'u3',
          title: 'Prepare issue template',
          summary: 'Prapare and describe an issue template which will help with the project management',
          dueDate: '2024-06-15'
        },
        {
          id: 't3',
          userId: 'u3',
          title: 'Prepare issue template',
          summary: 'Prapare and describe an issue template which will help with the project management',
          dueDate: '2024-06-15'
        }
    ];

    constructor() {
        console.log(localStorage.getItem('tasks'))
        const tasks = localStorage.getItem('tasks');
        if (tasks) {

            this.tasks = JSON.parse(tasks);
        }
    }

    getUserTasks(userId: string) {
        return this.tasks.filter((task) => task.userId === userId);
    }

    addTask(taskData: NewTaskData, userId: string) {
        this.tasks.unshift({
            // id value is for demo purposes better ways to create unique id
            id: new Date().getTime().toString(),
            userId: userId,
            title: taskData.title,
            summary: taskData.summary,
            dueDate: taskData.date
        })
        this.saveTasks();
    }

    removeTask(id: string) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveTasks();
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

}