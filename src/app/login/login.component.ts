import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  data: any;
  userType: any;
  buttonDisable = false;

  constructor(private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    if (this.username === 'deo@jahernotice.com' && this.password === 'deo@123') {
      this.userType = 1;
      this.success();
    } else if (this.username === 'qao@jahernotice.com' && this.password === 'qao@123') {
      this.userType = 2;
      this.success();
    } else {
      this.toastr.error('Username And/Or Password Incorrect ', 'Invalid Credential');
    }
  }
  success() {
    localStorage.setItem('user_type', this.userType);
    this.router.navigate(['upload-notice']);
  }
}
