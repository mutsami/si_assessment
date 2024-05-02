import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

/* 
 Regex expression to determine the
   strength of the password provided 
*/

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user!: Observable<any>;
  /**
   * Password provided by user on the registration/signup form
   */
  new_password: string | undefined;

  /**
   *
   */
  confirmPassword: string | undefined;

  /**
   * @ignore
   */

  signin_email_bool: boolean = true;
  signup_success_bool: boolean = false;

  uppercase: boolean = true;
  lowercase: boolean = true;
  min_length: boolean = true;
  number_bool: boolean = true;
  special_char_bool: boolean = true;
  registration_email_bool: boolean = true;
  password_matching_bool: boolean = true;
  registration_form_valid_bool: boolean = false;

  /**
   * Defines a FormGroup named registrationForm to encapsulate the registration form fields
   */

  registrationForm: FormGroup = new FormGroup({
    fullName: new FormControl<string>(''),
    registration_email: new FormControl<string>(''),
    new_password: new FormControl<string>(''),
    confirmPassword: new FormControl<string>(''),
  });

  /**
   * Defines a FormGroup named signinForm to encapsulate the signin form fields
   */
  signinForm: FormGroup = new FormGroup({
    signin_email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  /**
   * This method retrieves the FormControl instance corresponding to the signin email field
   * and applies a regular expression pattern check to validate if the email is in a valid format then
   * returns the FormControl instance representing the registration email field.
   */

  get signinEmailField() {
    const value = this.signinForm.controls['signin_email'].value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(value)) {
      this.signin_email_bool = false;
    } else {
      this.signin_email_bool = true;
    }
    ``;
    return this.signinForm.controls['signin_email'];
  }

  /**
   * This method retrieves the FormControl instance corresponding to the registration email field
   * and applies a regular expression pattern check to validate if the email is in a valid format then
   * returns the FormControl instance representing the registration email field.
   */

  get registrationEmailField() {
    const value = this.registrationForm.controls['registration_email'].value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(value)) {
      this.registration_email_bool = false;
    } else {
      this.registration_email_bool = true;
    }
    return this.registrationForm.controls['registration_email'];
  }

  /**
   * This method retrieves the FormControl instance corresponding to the new password field
   * and applies regular expression pattern checks to validate if the password is in a valid format then
   * returns the FormControl instance representing the new password field.
   */

  get passwordFormField() {
    const value = this.registrationForm.controls['new_password'].value;
    const uppercase_regex = /^(?=.*[A-Z])/;
    const lowercase_regex = /^(?=.*[a-z])/;
    const number_regex = /.*[0-9].*/;
    const min_length_regex = /.{6,}/;
    const special_character_regex = /.*[!@#$%^&*()_+{}\[\]:;<>,.?/\|`~-].*/;

    if (uppercase_regex.test(value)) {
      this.uppercase = false;
    } else {
      this.uppercase = true;
    }

    if (lowercase_regex.test(value)) {
      this.lowercase = false;
    } else {
      this.lowercase = true;
    }

    if (min_length_regex.test(value)) {
      this.min_length = false;
    } else {
      this.min_length = true;
    }

    if (number_regex.test(value)) {
      this.number_bool = false;
    } else {
      this.number_bool = true;
    }

    if (special_character_regex.test(value)) {
      this.special_char_bool = false;
    } else {
      this.special_char_bool = true;
    }

    if (
      value == this.registrationForm.controls['confirmPassword'].value &&
      this.registrationForm.controls['confirmPassword'].value != undefined
    ) {
      this.password_matching_bool = false;
    } else {
      this.password_matching_bool = true;
    }

    return this.registrationForm.controls['new_password'];
  }

  /**
   * @ignore
   */

  constructor(
    private formBuilder: FormBuilder,
    protected auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((e) => {
      this.user = e;

      return e;
    });
  }

  add(no1:any,no2:any){
    return no1 + no2
  }

  submitSigninForm() {
    if (!this.signin_email_bool) {
      console.log('Form submitted successfully!', this.signinForm.value);
      this.auth
        .signIn(
          this.signinForm.value.signin_email,
          this.signinForm.value.password,
        )
        .then((e) => {
          console.log('Sign In', e);
          this.router.navigate(['/']);
        });
    } else {
      console.log('Form invalid. Please fill out the form correctly.');
    }
  }

  /**
   * This method is triggered when submitting the registration form.
   * It checks various boolean flags representing different validation conditions.
   * If all validation conditions are met and the form is overall valid.
   */

  submitRegForm() {
    if (
      !this.uppercase &&
      !this.lowercase &&
      !this.min_length &&
      !this.number_bool &&
      !this.special_char_bool &&
      !this.registration_email_bool &&
      !this.password_matching_bool &&
      this.registrationForm.valid
    ) {
      console.log('Form submitted successfully!', this.registrationForm.value);

      this.auth
        .signUp(
          this.registrationForm.value.registration_email,
          this.registrationForm.value.new_password,
        )
        .then((e) => {
          console.log('Sign Up', e);
          this.signup_success_bool = true;
          // window.alert(
          //   'Account registration was succefull, proceed to signing in',
          // );
          this.router.navigate(['/']);
        });
    } else {
      console.log('Form invalid. Please fill out the form correctly.');
    }
  }

  /**
   *  This function scrolls the page to a specified HTMLElement smoothly.
   *  It takes an HTMLElement parameter 'el' representing the target element to scroll to.
   * It uses the scrollIntoView method with the 'smooth' behavior option to achieve smooth scrolling to the target element.

   * @param {HTMLElement} el  target ID to scroll to
   */

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * This method checks if the new password and confirm password fields match.
   *  It first checks if either the new password or the confirm password field is undefined.
   * If either field is undefined, it returns false, indicating that the passwords do not match.
   * Otherwise, it compares the values of the new password and confirm password fields.
   * It returns true if the passwords match, indicating that they are the same, and false otherwise.

   * @returns The result of if the new password matches with the confirmation password
   */

  passwordsMatch(): boolean {
    if (this.new_password != undefined || this.confirmPassword != undefined) {
      return false;
    } else {
      return this.new_password === this.confirmPassword;
    }
  }
}
