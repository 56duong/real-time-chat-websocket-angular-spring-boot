import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { ActiveUsersListComponent } from './active-users-list/active-users-list.component';
import { SharedModule } from '../../shared/shared.module';
import { SelectUsersDialogComponent } from './select-users-dialog/select-users-dialog.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MessagesComponent,
    ActiveUsersListComponent,
    SelectUsersDialogComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule,
    PrimengModule,
    FormsModule
  ]
})
export class MessagesModule { }
