import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {

    const val1= control.get(controlName1)?.value;
    const val2 =  control.get(controlName2)?.value;

    if (val1 ===  val2) {
      return null;
    }

    return  {valuesNotEqual: true};
  }
}

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
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    }, {
      validators: [equalValues('password', 'confirmPassword')]
    }),
    firstName: new FormControl('', { validators: Validators.required }), 
    lastName: new FormControl('', { validators: Validators.required }),
    address: new FormGroup({
      street: new FormControl('', { validators: Validators.required }),
      number: new FormControl('', { validators: Validators.required }),
      postalCode: new FormControl('', { validators: Validators.required }),
      city: new FormControl('', { validators: Validators.required })
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: Validators.required
    }),
    // Use Form Array when you have a list of controls that you don't want/need a unique name per control
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
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
      this.form.controls.passwords.controls.password.dirty &&
      this.form.controls.passwords.controls.password.touched &&
      this.form.controls.passwords.controls.password.invalid
    );
  }

  ngOnInit() {
    
  }

  onSubmit() {
    // Will be true if at least one of all the controls in the entire form is invalid
    if (this.form.invalid) {
      console.log("INVALID form");
      return;
    }
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }

}
