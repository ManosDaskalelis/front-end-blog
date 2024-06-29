import { Injectable } from '@angular/core';
import { LoginModel } from '../shared/models/login.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../shared/models/login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel } from '../shared/models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<UserModel | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  login(request: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/Auth/Login`, {
      email: request.email,
      password: request.password
    }
    )
  }

  setUser(user: UserModel): void {
    this.$user.next(user);

    localStorage.setItem('user-email', user.email)
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user() : Observable<UserModel | undefined> {
    return this.$user.asObservable();
  }

  logOut(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }

  getUser(): UserModel | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user: UserModel = {
        email: email,
        roles: roles.split(',')
      };

      return user;
    }
    return undefined;
  }
}
