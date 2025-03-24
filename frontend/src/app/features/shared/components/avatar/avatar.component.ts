import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  @Input() username?: string;
  @Input() width: string = '32px';
  @Input() height?: string;
  @Input() isOnline?: boolean;
  @Input() avatarUrl?: string;


  constructor(
    public userService: UserService,
  ) {}


  ngOnInit() {
    if(!this.height) {
      this.height = this.width;
    }
    if(!this.avatarUrl) {
      this.avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s';
    }
  }

}
