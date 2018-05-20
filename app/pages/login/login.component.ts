import { Component } from '@angular/core';
import { User } from '../../shared/user/user';
import { UserService } from '../../shared/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  providers: [UserService],
  templateUrl: './pages/login/login.html',
  styleUrls: ['./pages/login/login-common.css', './pages/login/login.css']
})
export class LoginComponent {
  user: User;
  isLoggingIn = true;

  constructor(private userService: UserService, private router: Router) {
    this.user = new User();
    this.user.email = 'jorge.vergara@yuxiglobal.com';
    this.user.password = '0304032';
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService
      .login(this.user)
      .subscribe(() => this.router.navigate(['/list']), () => alert('Something went wrong'));
  }

  signUp() {
    this.userService.register(this.user).subscribe(
      () => {
        alert('Your account was successfully created.');
        this.toggleDisplay();
      },
      () => alert('Unfortunately we were unable to create your account.')
    );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}
