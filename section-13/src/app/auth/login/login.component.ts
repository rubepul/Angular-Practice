import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

// Building custom validator
function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    // the of function produces and observable that instantly emits a value
    return of(null);
  }

  return of({notUnique: true});
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Setting up the form
  form = new FormGroup({
    // Adding validators to reactive forms
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      /*
        An async validator is also a function that must return an observable.
        It allows one to do such things as send an HTTP request to the backend to check 
        if an email already exist.
      */
        asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      // Function should return null if the input is considered valid or error object if invalid
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    })
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched && 
      this.form.controls.email.dirty && 
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
    this.form.controls.password.touched && 
    this.form.controls.password.dirty && 
    this.form.controls.password.invalid
    );
  }

  onSubmit() {
    console.log(this.form);
    const enteredEmail =  this.form.value.email;
    const enteredPassword =  this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}

