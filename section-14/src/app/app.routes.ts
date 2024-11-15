import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
  },
  {
    // : sets up a dynamic route
      path: 'users/:userId', //<your-domain>/users/<uid>
      component: UserTasksComponent
  },
];
