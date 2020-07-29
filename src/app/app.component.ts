import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';
import {
  Router, NavigationStart, NavigationEnd,
  NavigationCancel, NavigationError, Event
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public customLayout: boolean;
  showLoadingIndicator = true;

  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.customLayout = value;
      if (!this.customLayout) {
        try {
          const currentUser = JSON.parse(localStorage.getItem('currentUser'));
          if (!currentUser) {
            // this.router.navigate(['/login']);
          }
        } catch (e) {
          // this.router.navigate(['/login']);
        }
      }
    });

    this.router.events.subscribe((routerEvent: Event) => {

      // On NavigationStart, set showLoadingIndicator to ture
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      // On NavigationEnd or NavigationError or NavigationCancel
      // set showLoadingIndicator to false
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false;
      }

    });

  }
  onclick(){
    return false;
  }

}
