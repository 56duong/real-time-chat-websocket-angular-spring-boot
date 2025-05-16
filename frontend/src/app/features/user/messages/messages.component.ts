import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageContent, MessageType } from 'src/app/core/interfaces/message-content';
import { MessageRoom } from 'src/app/core/interfaces/message-room';
import { MessageRoomMember } from 'src/app/core/interfaces/message-room-member';
import { User } from 'src/app/core/interfaces/user';
import { MessageContentService } from 'src/app/core/services/message-content.service';
import { MessageRoomMemberService } from 'src/app/core/services/message-room-member.service';
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
  messageToSend: MessageContent = {};
  messageRooms: MessageRoom[] = [];


  constructor(
    public userService: UserService,
    private messageRoomService: MessageRoomService,
    private messageContentService: MessageContentService,
    private router: Router,
    private messageRoomMemberService: MessageRoomMemberService,
  ) {}


  ngOnInit() {
    this.currentUser = this.userService.getFromLocalStorage();

    this.userService.connect(this.currentUser);
    this.messageContentService.connect(this.currentUser);
    
    window.addEventListener('beforeunload', () => {
      this.userService.disconnect(this.currentUser);
    });

    this.findMessageRoomAtLeastOneContent();
    this.subscribeMessages();
  }


  ngOnDestroy() {
    this.userService.disconnect(this.currentUser);
    this.messageContentService.disconnect();
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
              this.messageRooms.unshift(createdMessageRoom);
              this.selectMessageRoom(createdMessageRoom);
            },
            error: (error) => {
              console.log(error);
            }
          });
        }
        else {
          const room = this.messageRooms.filter(r => r.id === foundMessageRoom.id)[0];
          if(room) {
            this.selectMessageRoom(room);
          }
          else {
            this.messageRooms.unshift(foundMessageRoom);
            this.selectMessageRoom(foundMessageRoom);
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



  selectMessageRoom(room: MessageRoom) {
    console.log(room);
    if(this.selectedMessageRoom.id) {
      this.updateLastSeen(this.selectedMessageRoom.id, this.currentUser.username);
    }
    this.selectedMessageRoom = room;
    if(this.selectedMessageRoom.id) {
      this.updateLastSeen(this.selectedMessageRoom.id, this.currentUser.username);
    }
    this.getMessagesByRoomId();
  }



  getMessagesByRoomId() {
    this.messageContentService.getMessagesByRoomId(this.selectedMessageRoom.id).subscribe({
      next: (messages: MessageContent[]) => {
        this.selectedMessageRoom.messages = messages;
        this.scrollToBottom();
      }, error: (error: any) => {
        console.log(error);
      }
    });
  }



  subscribeMessages() {
    this.messageContentService.subscribeMessagesObservable().subscribe({
      next: (messageContent: MessageContent) => {
        if(messageContent.messageRoomId === this.selectedMessageRoom.id) {
          this.selectedMessageRoom.lastMessage = messageContent;
          this.selectedMessageRoom.messages?.push(messageContent);
          this.scrollToBottom();
        }
        else {
          const roomToPush = this.messageRooms?.filter(r => r.id === messageContent.messageRoomId)[0];
          if(roomToPush) {
            roomToPush.lastMessage = messageContent;
            roomToPush.unseenCount = (roomToPush.unseenCount ?? 0) + 1; 
            this.messageRooms = this.messageRooms.filter(r => r.id !== messageContent.messageRoomId);
            this.messageRooms.unshift(roomToPush);
          }
          else {
            this.messageRoomService.findById(messageContent.messageRoomId).subscribe({
              next: (room: MessageRoom) => {
                room.lastMessage = messageContent;
                room.unseenCount = 1;
                this.messageRooms.unshift(room);
              }, error: (error: any) => {
                console.log(error);
              }
            });
          }
        }
      }, error: (error: any) => {
        console.log(error);
      }
    });
  }



  sendMessage() {
    this.messageToSend = {
      content: this.messageToSend.content,
      messageRoomId: this.selectedMessageRoom.id,
      sender: this.currentUser.username,
      messageType: MessageType.TEXT
    }

    this.messageContentService.sendMessage(this.messageToSend);

    console.log('this.messageToSend', this.messageToSend);

    this.messageToSend = {};
  }



  logout() {
    this.userService.disconnect(this.currentUser);
    this.messageContentService.disconnect();
    this.userService.removeFromLocalStorage();
    this.router.navigate(['/login']);
  }



  updateLastSeen(roomId?: string, username?: string) {
    this.messageRoomMemberService.updateLastSeen(roomId, username).subscribe({
      next: (member: MessageRoomMember) => {
        this.selectedMessageRoom.unseenCount = 0;
      }, error: (error: any) => {
        console.log(error);
      }
    });
  }



  findMessageRoomAtLeastOneContent() {
    // find room at least 1 content
    if(!this.currentUser.username) return;
    this.messageRoomService.findMessageRoomAtLeastOneContent(this.currentUser.username).subscribe({
      next: (rooms: MessageRoom[]) => {
        console.log('rooms', rooms);
        this.messageRooms = rooms;
      }, error: (error) => {
        console.log(error);
      }
    });
  }



  scrollToBottom() {
    setTimeout(() => {
      const chat = document.getElementById('chat-area');
      if(chat) chat.scrollTop = chat.scrollHeight;
    }, 100);
  }

}
