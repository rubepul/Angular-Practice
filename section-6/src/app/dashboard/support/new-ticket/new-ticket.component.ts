import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, viewChild, ViewChild} from '@angular/core';
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
export class NewTicketComponent implements OnInit, AfterViewInit{
  // Using @ViewChild decorator or viewChild signal function we can get access to template elements
  // If using viewchild function you can access the element stored in a property in ngOnInit

  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  // private form =  viewChild.required<ElementRef<HTMLFormElement>>('form');

  @Output() add = new EventEmitter<{title: string; text: string}>();
  // add = output<{title: string; text: string}>();

  ngOnInit(): void {
    console.log("On It")
    console.log(this.form?.nativeElement)
  } 
  
  // Guaranteed to have access to the elements that have been selected w/ ViewChild
  ngAfterViewInit(): void {
     console.log("After View It")
     console.log(this.form?.nativeElement)
  }

  /*
      .dir() method displays an interactive list of the 
      properties of the specified JS object 
  */
  onSubmit(title: string, ticketText: string){
    this.add.emit({title: title, text: ticketText})
    this.form?.nativeElement.reset();
  }
}
