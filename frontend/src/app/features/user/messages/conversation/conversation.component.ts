import { Component, Input } from '@angular/core';
import { MessageRoom } from 'src/app/core/interfaces/message-room';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {
  @Input() room: MessageRoom = {};
  @Input() currentUser: User = {};
  @Input() selectedMessageRoomId: string | undefined = '';



  constructor(
    public userService: UserService,
  ) { }

}


