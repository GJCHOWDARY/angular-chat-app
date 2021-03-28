import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  isAuthenticated: boolean = false;
  isDisabled: boolean = false;
  constructor(
    public authService: AuthService, 
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuth();
    if (this.isAuthenticated) {
      this.router.navigate(["/authorized/dashboard"]);
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isDisabled = true;
    this.authService.login(form.value.email, form.value.password).subscribe((response) => {
      this.authService.saveLoginInfo(response);
      this.router.navigate(["/authorized/dashboard"]);
    },
      error => {
        this.isDisabled = false;
      });
  }
}
