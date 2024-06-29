import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModel } from 'src/app/shared/models/login.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginModel

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router) {
    this.model = {
      email: '',
      password: ''
    };
  }

  onFormSubmit(): void {
    this.authService.login(this.model)
    .subscribe({
      next: (response) => {
        this.cookieService.set("Authorization", `Bearer ${response.token}`,
          undefined, '/', undefined, true, 'Strict');

          this.authService.setUser({
            email: response.email,
            roles: response.roles
          });
          this.router.navigateByUrl('/');
      }
    })
  }
}
