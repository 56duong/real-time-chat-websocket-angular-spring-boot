import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = {
    username: '',
    password: ''
  }

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}


  login() {
    if(!this.user.username || !this.user.password) return;

    this.user.username = this.user.username.trim();
    this.user.password = this.user.password.trim();

    this.userService.login(this.user).subscribe({
      next: (response: User) => {
        console.log(response);
        this.userService.saveToLocalStorage(response);
        this.router.navigate(['/']);
      }, 
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
