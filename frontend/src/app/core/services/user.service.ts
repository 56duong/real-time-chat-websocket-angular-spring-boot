import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + environment.apiVersion + 'users';

  constructor(
    private http: HttpClient,
  ) { }


  login(user: User): Observable<User> {
    return this.http.post(this.apiUrl, user);
  }


  saveToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify({
      username: user.username,
      avatarUrl: user.avatarUrl
    }));
  }

}
