import { Component, ElementRef, viewChild, ViewChild} from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  // Using @ViewChild decorator or viewChild signal function we can get access to template elements
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  private form =  viewChild.required<ElementRef<HTMLFormElement>>('form');

  onSubmit(title: HTMLInputElement, request: string){
    /*
      .dir() method displays an interactive list of the 
      properties of the specified JS object 
    */
    console.dir(title.value)
    this.form().nativeElement.reset();
  }
}
