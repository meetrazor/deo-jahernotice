import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    const user = localStorage.getItem('user_type');
    if (!user) {
      this.logout();
    }
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('user_type');
  }

}
