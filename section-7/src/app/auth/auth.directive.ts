import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';
import { LogDirective } from '../learning-resources/log.directive';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'});
  private authService = inject(AuthService);

  // TemplateRef gives you access to the content of the template
  private templateRef = inject(TemplateRef);

  // ViewContainerRef gives you access to the place in the DOM where the template is being used
  private viewContainerRef = inject(ViewContainerRef);

  constructor() { 
    // effect function runs some code whenever a signal changes
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        // Will tell Angular to render templateRef in a certain place in the DOM
         this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        // Will clear the rendered content
        this.viewContainerRef.clear();
      }
    });
  }

}
