import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit{
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    firstName: new FormControl('', { validators: Validators.required }), 
    lastName: new FormControl('', { validators: Validators.required }),
    street: new FormControl('', { validators: Validators.required }),
    number: new FormControl('', { validators: Validators.required }),
    postalCode: new FormControl('', { validators: Validators.required }),
    city: new FormControl('', { validators: Validators.required }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: Validators.required
    }),
    agree: new FormControl(false, { validators: Validators.required })
  });

  emailIsInvalid() {
    return (
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid &&
      this.form.controls.email.touched
    );
  }

  passwordIsInvalid() {
    return (
      this.form.controls.password.dirty &&
      this.form.controls.password.touched &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit() {
    
  }

  onSubmit() {
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }

}
