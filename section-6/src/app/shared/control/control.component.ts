import { Component, Input, ViewEncapsulation } from '@angular/core';

// With ViewEncapsulation.None the css styles in the styleUrl will become global styles

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ControlComponent {
  @Input({required: true}) label!: string;

}
