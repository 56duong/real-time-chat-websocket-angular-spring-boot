import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageRoom } from 'src/app/core/interfaces/message-room';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss']
})
export class ConversationsListComponent {

  @Input() currentUser: User = {};
  @Input() messageRooms: MessageRoom[] = [];
  @Input() selectedMessageRoomId: string | undefined = '';
  @Output() selectRoom = new EventEmitter<MessageRoom>();

}
