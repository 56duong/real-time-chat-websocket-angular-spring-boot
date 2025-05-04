import { Component, Input } from '@angular/core';
import { MessageContent } from 'src/app/core/interfaces/message-content';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent {

  @Input() messageContent?: MessageContent;
    @Input() currentUser?: User;

}
