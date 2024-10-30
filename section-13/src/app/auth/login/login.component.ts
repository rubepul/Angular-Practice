import { afterNextRender, Component, DestroyRef, inject, ViewChild, viewChild } from '@angular/core';
import { EmailValidator, FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  // @ViewChild('form') formOld = NgForm;

  private destroyRef = inject(DestroyRef);

  constructor() {
    /*
      Using afterNextRender because we are using the  template-driven approach,
      and so the form is created with the help of the template.
      So only after the template is done rendering is the form fully initialized.
    */
    afterNextRender(() => {
      // Using the saved value to pre-populate the form
      const savedForm = window.localStorage.getItem('saved-login-form');

      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail =  loadedFormData.email;
        /*
          Without setTimeout it will give TypeError: Cannot read properties of undefined.
          This is because while the template has been rendered and the form object 
          intiialized, the control objects haven't been fully initialized.
        */
        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail);
        }, 1);
      }

      /* 
        Subscribe to be notified about changes, because the observable will emit new
        values whenever the values entered into the form change (every keystroke)
      */
      const subscription = this.form().valueChanges?.pipe(debounceTime(1000)).subscribe({
        next: (value) =>  
          // Object will be stored in the local storage with every keystroke
          window.localStorage.setItem(
            'saved-login-form', 
            JSON.stringify({email: value.email})
          ),
      });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    // Extracting user input
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log(formData.form);
    console.log(enteredEmail, enteredPassword);

    /* 
    Will reset the form. It will clear the input values and reset all the internally 
    managed information about the form (whether it valid, touched, pristine)
    */
    formData.form.reset();
  }
}
