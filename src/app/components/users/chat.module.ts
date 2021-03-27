import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from "../../angular-material.module";
import { ChatComponent } from './chat/chat.component';
import { ChatRoutingModule } from './chat-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [ChatComponent,DashboardComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ChatRoutingModule
  ]
})
export class ChatsModule { }
