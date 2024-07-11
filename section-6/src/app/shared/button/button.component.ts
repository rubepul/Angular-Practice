import { Component } from '@angular/core';

@Component({
  /* 
    Attribute Selector (controls buttons that have the attribute appButton)..
    Is used if you wanna extend  a built in element.
  */
  selector: 'button[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

}
