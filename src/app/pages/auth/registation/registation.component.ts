import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registation',
  imports: [IonicModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registation.component.html',
  styleUrls: ['./registation.component.scss'],
})
export class RegistationComponent implements OnInit {

  registerForm!: FormGroup;
  otpSent = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      mobile: ['', [
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$')
      ]],
      otp: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  sendOtp() {
    if (this.registerForm.invalid) return;
    this.otpSent = true;
  }

  verifyOtp() {
    if (this.registerForm.invalid) return;
    console.log('Register Data:', this.registerForm.value);
  }

}
