import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";
import { AuthService } from "../../../auth/auth.service";
import { Subject, Subscription } from "rxjs";
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: any;
  userInfo: any;
  isLoading = false;
  search: string = '';
  displayedColumns: string[] = ['Name', 'Email', 'Action'];

  private chatListenerSubs = new Subscription();

  constructor(
    public chatService: ChatService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.userInfo = this.authService.getUserData();
    this.chatService.connect();
    this.chatListenerSubs = this.chatService.getMessage()
      .subscribe((msg: any) => {
        console.log(msg,"socket.io message received!!")
      });
  }

  sendMessage() {
    this.chatService.sendMessage({ msg: 'hellooo' });
  }

  onSearch() {
    this.getUsers();
  }

  getUsers() {
    this.authService.getUsers(this.search).subscribe((data: any) => {
      this.users = data.users;
    });
  }

  getUserData(userId: string) {
    this.authService.getUserDetails(userId).subscribe((data: any) => {
      this.userInfo = data.user;
    });
  }

}
