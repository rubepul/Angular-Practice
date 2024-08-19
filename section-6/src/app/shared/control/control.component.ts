import { afterNextRender, afterRender, Component, contentChild, ContentChild, ElementRef, inject, Input, ViewEncapsulation } from '@angular/core';

// With ViewEncapsulation.None the css styles in the styleUrl will become global styles

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  // Will add the class property whenever app-control wherever it's being used (used instead of HostBinding)
  // Can also listen to events (used instead of HostListener)
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
  @Input({required: true}) label!: string;

  // Use ContentChild to get ahold of projected content
  // @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  private control = contentChild<HTMLInputElement | HTMLTextAreaElement>('input');

  /*
    afterRender and afterNextRender allow you to define functions that 
    should be executed whenever anything changes in the entire angular application.
    afterRender - listens to all future changes
    afterNextRender - will only be triggered for the next change anywhere
  */
  constructor() {
    // afterRender(() => {
    //   console.log("after render")
    // });
    // afterNextRender(() => {
    //   console.log("after next render")
    // });
  }

  // Accessing Host Elements Programmatically
  private el = inject(ElementRef)


  onClick() {
    console.log(this.el)
    console.log(this.control())
  }

}
