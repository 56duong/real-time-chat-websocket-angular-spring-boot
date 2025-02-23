import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';



@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    InputTextModule,
    PasswordModule
  ]
})
export class PrimengModule { }
