import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../../../auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  day: string; date: number;
  year: number; month: string;
  taskDetatils: any; isLoading: boolean = true;
  userData: any;

  constructor(private authService: AuthService) {
    let d = new Date();
    this.date = d.getDate();
    this.year = d.getFullYear();
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.month = month[d.getMonth()];
    var getday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    this.day = getday[d.getDay()];
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData();
  }

  calHours(n: number) {
    var num: any = (n * 60).toFixed(2);
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    console.log(n, num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).");
    return `${rhours}:${rminutes}`
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);
  }

}
