import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";
import { AuthService } from "../../../auth/auth.service";
import { Subject, Subscription } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ChatPopupComponent } from '../chat-popup/chat-popup.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: any;
  userInfo: any;
  isLoading = false;
  isLoadingInfo = false;
  search: string = '';
  displayedColumns: string[] = ['Name', 'Email', 'Action'];
  isLoginDialogOpen: boolean = false;

  private chatListenerSubs = new Subscription();

  constructor(
    public chatService: ChatService,
    public authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isLoginDialogOpen = false;
    this.getUsers();
    this.userInfo = this.authService.getUserData();
    this.chatService.connect();
    if (!this.isLoginDialogOpen) { 
      this.chatListenerSubs = this.chatService.getMessage()
        .subscribe((msg: any) => {
          if (!this.isLoginDialogOpen && msg.receiverId == this.userInfo.userId) {
            this.openDialog(msg.receiverId, 'socket', msg);
          }
        });
    }
    this.isLoading = true;
    this.isLoadingInfo = true;
  }

  sendMessage() {
    const msg1 = {
      "message": "Test!!",
      "receiverId": "605e4c96dc2e14b76a93c885"
    }
    this.chatService.sendMessage(msg1).subscribe((data: any) => {
      // console.log(data,)
    });
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
    this.isLoadingInfo = false;
    this.authService.getUserDetails(userId).subscribe((data: any) => {
      this.userInfo = data.user;
      this.isLoadingInfo = true;
    });
  }

  openDialog(receiverId: string, mode: string, message?: any) {
    this.isLoginDialogOpen = true;
    if (message) {
      receiverId = message.senderId;
    }
    this.isLoginDialogOpen = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = { senderId: this.userInfo.userId, receiverId, message, mode };
    const dialogRef = this.dialog.open(ChatPopupComponent, dialogConfig);
    this.isLoginDialogOpen = true;
    //INFO: After close the dialog dataset Description will be changed
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  formateName(a: string, b?: string) {
    var l1 = a.charAt(0).toUpperCase();
    if (b) {
      var l2 = b.charAt(0).toUpperCase();
      return l1 + l2;
    }
    return l1;
  }

}
