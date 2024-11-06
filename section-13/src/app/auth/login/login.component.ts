import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

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

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  private destroyRef = inject(DestroyRef);


  // Setting up the form
  form = new FormGroup({
    // Adding validators to reactive forms
    email: new FormControl(initialEmailValue, {
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

  ngOnInit() {
    // const savedForm = window.localStorage.getItem('saved-login-form');
    
    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   this.form.patchValue({
    //     email: loadedForm.email,
    //   });
    // }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem(
          'saved-login-form', 
          JSON.stringify({email: value.email})
        );
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    console.log(this.form);
    const enteredEmail =  this.form.value.email;
    const enteredPassword =  this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}

