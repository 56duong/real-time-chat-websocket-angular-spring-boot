import { Component } from '@angular/core';
import { MessageRoom } from 'src/app/core/interfaces/message-room';
import { User } from 'src/app/core/interfaces/user';
import { MessageRoomService } from 'src/app/core/services/message-room.service';
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
  isShowDialogChat: boolean = false;
  selectedMessageRoom: MessageRoom = {};


  constructor(
    private userService: UserService,
    private messageRoomService: MessageRoomService,
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



  chat(selectedUsers: User[]) {
    console.log(selectedUsers);
    this.isShowDialogChat = false;

    const usernames = selectedUsers.map(u => u.username).filter((u): u is string => u !== undefined);
    if(this.currentUser.username) usernames.push(this.currentUser.username);
    
    this.messageRoomService.findMessageRoomByMembers(usernames).subscribe({
      next: (foundMessageRoom: MessageRoom) => {
        console.log('foundMessageRoom', foundMessageRoom);
        // not found
        if(!foundMessageRoom) {
          if(!this.currentUser.username) return;
          // create
          this.messageRoomService.createChatRoom(this.currentUser.username, usernames).subscribe({
            next: (createdMessageRoom: MessageRoom) => {
              console.log('createdMessageRoom', createdMessageRoom);
            },
            error: (error) => {
              console.log(error);
            }
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



  selectMessageRoom(room: MessageRoom) {
    console.log(room);
    this.selectedMessageRoom = room;
  }

}
