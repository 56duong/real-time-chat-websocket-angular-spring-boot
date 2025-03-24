import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { ActiveUsersListComponent } from './active-users-list/active-users-list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MessagesComponent,
    ActiveUsersListComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule
  ]
})
export class MessagesModule { }
