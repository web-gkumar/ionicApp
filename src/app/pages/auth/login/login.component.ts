import { Component, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Auth } from '../../../shared/services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [IonicModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm: FormGroup;
  hidePassword = true;

  constructor( private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: [ '', [ Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {
    
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('profile', JSON.stringify(res.user));
          alert('Login Success');
          this.router.navigateByUrl('tabs/profile');
        },
        error: (err: any) => {
          console.log(err);
          alert( err?.error?.message || 'Login Failed');
        }
      });
  }




}
