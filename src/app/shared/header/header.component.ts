import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  IsAuthenticated = false;
  processingData: any = [];
  userData: any = [];
  usersAnvData: any;
  userDetails: any = {};
  selectedFiles: any;
  sidenavWidth = 4;
  private toggelListener = new Subject<boolean>();
  private authListenerSubs = new Subscription();

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.IsAuthenticated = this.authService.getIsAuth();
    this.userData = this.authService.getUserData()
    if (this.IsAuthenticated) {
      this.getUserDetails();
    }
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.IsAuthenticated = isAuthenticated;
        this.userData = this.authService.getUserData()
        if (this.IsAuthenticated) {
          this.getUserDetails();
        }
      });
  }

  getUserDetails() {
    this.authService.getUserDetails(this.userData.userId).subscribe((res: any) => {
      this.userDetails = res.user;
    },
      error => {
      });
  }

  onLogout() {
    this.authService.logout();
  }

  Toggle() {
  }

}
