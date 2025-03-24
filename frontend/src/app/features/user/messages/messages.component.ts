import { Component } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  /**
   * 1. connect /api/ws
   * 2. subscribe /topic/active
   * 3. send connect to others /app/user/connect
   */

  currentUser: User = {};
  activeUsersSubscription: any;


  constructor(
    private userService: UserService,
  ) {}


  ngOnInit() {
    this.currentUser = this.userService.getFromLocalStorage();

    this.userService.connect(this.currentUser);
    
    window.addEventListener('beforeunload', () => {
      this.userService.disconnect(this.currentUser);
    });
  }


  ngOnDestroy() {
    this.userService.disconnect(this.currentUser);
  }

}
