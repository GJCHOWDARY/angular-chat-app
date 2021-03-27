import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
  sidenavWidth = 4;
  userData: any = [];
  userIsAuthenticated = false;
  email: string = '';
  userDetails: any = {};
  isLoading = true;
  selectedfile = false;
  toggle: boolean = true;
  bufferValue = 10;
  progressValue = 0;
  brogressBar = false;
  private userId: string = '';
  private authListenerSubs= new Subscription();
  
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.userIsAuthenticated = this.authService.getIsAuth();
    if (this.userIsAuthenticated) {
      this.getUserDetails();
      this.authListenerSubs = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userData = this.authService.getUserData();
          if (this.userIsAuthenticated) {
            this.getUserDetails();
          }
        });
    }
  }

  getUserDetails() {
    this.authService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res.user;
    },
      error => {
      });
  }

  increase() {
    this.sidenavWidth = 15;
    // console.log("increase sidenav width");
  }
  decrease() {
    this.sidenavWidth = 4;
    // console.log("decrease sidenav width");
  }
}
