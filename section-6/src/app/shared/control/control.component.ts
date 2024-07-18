import { Component, ElementRef, inject, Input, ViewEncapsulation } from '@angular/core';

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

  // Accessing Host Elements Programmatically
  private el = inject(ElementRef)

  onClick() {
    console.log(this.el)
  }

}
