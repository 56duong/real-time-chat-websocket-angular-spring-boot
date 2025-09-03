import { Component, Input } from '@angular/core';
import { MessageContent } from 'src/app/core/interfaces/message-content';
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

  unseenMessageIndex: number | undefined = undefined;



  ngOnChanges(changes: any) {
    if(changes?.selectedMessageRoom && changes.selectedMessageRoom?.currentValue && changes.selectedMessageRoom?.currentValue?.messages) {
      this.updateUnseenMessageIndex(this.selectedMessageRoom?.messages);
    }
  }



  updateUnseenMessageIndex(messages?: MessageContent[]) {
    const lastSeen: any = this.selectedMessageRoom?.members?.filter(m => m.username === this.currentUser?.username)?.[0]?.lastSeen;
    this.unseenMessageIndex = messages?.findIndex(
      (message => new Date(message.dateSent || '') > new Date(lastSeen) && message.sender !== this.currentUser?.username)
    );
  }

}
