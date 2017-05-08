import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.confirmPassword = new FormControl('', [Validators.required, this.matchPassword]);
    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  createAccount() {
    if (this.registerForm.valid) {
      this.menuCtrl.enable(true);
      this.navCtrl.setRoot('Home');
    }
  }

  validateEmail() {
    return this.email.valid || this.email.untouched;
  }

  validatePassword() {
    return this.password.valid || this.password.untouched;
  }

  matchPassword(input: FormControl) {
    if (!input.root.get('confirmPassword')) {
      return null;
    }
    const exactMatch = input.root.get('password').value === input.value;
    return exactMatch ? null : { mismatchedPassword: true };
  }
}
