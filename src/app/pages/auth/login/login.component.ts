declare var google: any;
import { Component, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-login',
  imports: [IonicModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit  {

  constructor(private http: HttpClient, private authService: Auth) {}

  ngAfterViewInit() {
    google.accounts.id.initialize({
      client_id: '394870904623-c2alhq89rj8r10r5402t5ksk72n440oi.apps.googleusercontent.com',
      callback: (response: any) => this.authService.handleGoogleResponse(response)
    });

    google.accounts.id.renderButton(
      document.getElementById('googleBtn'),
      {
        theme: 'outline',
        size: 'large',
      }
    );
  }


}
