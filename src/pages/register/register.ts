import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    public menuCtrl: MenuController,
    private builder: FormBuilder,
    public toastCtrl: ToastController
  ) {

    this.email = new FormControl('', [
      Validators.required
    ]);

    this.password = new FormControl('', [
      Validators.required,
    ]);

    this.confirmPassword = new FormControl('', [
      Validators.required,
      this.validatePassword
    ]);

    this.registerForm = this.builder.group({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  createAccount() {
    this.menuCtrl.enable(true);
    this.navCtrl.setRoot('Home');
  }

  validatePassword(input: FormControl) {

    if (!input.root.get('confirmPassword')) {

      return null;
    }

    const exactMatch = input.root.get('password').value === input.value;
    return exactMatch ? null : { mismatchedPassword: true };
  }
}
