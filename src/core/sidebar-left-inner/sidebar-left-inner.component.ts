import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-left-inner',
  templateUrl: './sidebar-left-inner.component.html'
})
export class SidebarLeftInnerComponent implements OnInit {
  currentUser: any;
  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('user_type'));
    // this.name = currentUser.admin_user_name;
    // this.schoolId = currentUser.school_id;
    // if (currentUser.school_id > 0) {
    //   this.school = false;
    // } else {
    //   this.school = true;
    // }
  }

}
