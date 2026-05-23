import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { Auth } from 'src/app/shared/services/auth';

@Component({
  selector: 'app-registation',
  imports: [IonicModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registation.component.html',
  styleUrls: ['./registation.component.scss'],
})
export class RegistationComponent implements OnInit {

  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private auth: Auth) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.signupForm.invalid) { this.signupForm.markAllAsTouched();
      return;
    }
    this.auth.signup(this.signupForm.value).subscribe(res => {
      alert('Registration successful! Please login.');
      this.signupForm.reset();
    });

  }

}
