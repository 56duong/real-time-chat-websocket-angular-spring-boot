import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageRoom } from 'src/app/core/interfaces/message-room';
import { User } from 'src/app/core/interfaces/user';
import { MessageRoomService } from 'src/app/core/services/message-room.service';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss']
})
export class ConversationsListComponent {

  @Input() currentUser: User = {};
  @Input() selectedMessageRoomId: string | undefined = '';
  @Output() selectRoom = new EventEmitter<MessageRoom>();
  messageRooms: MessageRoom[] = [];



  constructor(
    private messageRoomService: MessageRoomService,
  ) {}



  ngOnInit() {
    this.findMessageRoomAtLeastOneContent();
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

}
