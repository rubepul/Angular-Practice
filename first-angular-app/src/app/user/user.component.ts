import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';


interface User {
  id: string, 
  name: string, 
  avatar: string
}

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({required: true}) user!: User;

  @Output() select = new EventEmitter<{id: string, name: string}>();

  // Stores an EventEmitter under the hood
  // select = output<string>();

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser() {
    this.select.emit({id: this.user.id, name: this.user.name});
  }
}
