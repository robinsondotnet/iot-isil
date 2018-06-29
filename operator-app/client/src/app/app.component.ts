import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './_models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) {

  }

  get user(): User {
    return this.authService.getUser();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

}
