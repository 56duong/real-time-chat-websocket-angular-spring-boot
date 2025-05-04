import { Component, Input } from '@angular/core';
import { MessageRoom } from 'src/app/core/interfaces/message-room';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-message-contents-list',
  templateUrl: './message-contents-list.component.html',
  styleUrls: ['./message-contents-list.component.scss']
})
export class MessageContentsListComponent {

  @Input() selectedMessageRoom?: MessageRoom;
  @Input() currentUser?: User;

}
