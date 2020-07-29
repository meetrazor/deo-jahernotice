import { SocietyComponent } from './addnew/society/society.component';
import { NotificationComponent } from './notification/notification.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplateComponent } from './template/template.component';
import { AuctionComponent } from './auction/auction.component';
import { AuctionEmailComponent } from './auction/auction-email/auction-email.component';
import { AuctionEmailResolver } from './auction/auction-email/auction-email.resolver';
import { ViewAuctionComponent } from './auction/view-auction/view-auction.component';
import { AuctionViewResolver } from './auction/view-auction/auction-view.resolver';


const routes: Routes = [
  // {
  // path: 'login',
  // data: {
  //   customLayout: true,
  // },
  // children: [
  //    {
  //      path: '',
  //      component: LoginComponent
  //   }
  //   ]
  // },
  {
    path: '',
    redirectTo: 'auction/upload',
    pathMatch: 'full'
  },
  {
    path: 'upload-notice',
    data: {
      customLayout: false,
    },
    component: DashboardComponent
  },
  // {
  //   path: 'alert/:id',
  //   data: {
  //     customLayout: false,
  //   },
  //   component: TemplateComponent
  // },
  {
    path: 'notification',
    data: {
      customLayout: true,
    },
    component: NotificationComponent
  },
  // {
  //   path: 'society',
  //   data: {
  //     customLayout: false,
  //   },
  //   component: SocietyComponent
  // },
  {
    path: 'auction/upload',
    data: {
      customLayout: false,
    },
    component: AuctionComponent
  }, {
    path: 'auction/alert',
    data: {
      customLayout: false
    },
    component: AuctionEmailComponent,
    resolve: { users: AuctionEmailResolver }
  },
  {
    path: 'auction/view',
    component: ViewAuctionComponent,
    resolve: { Auction: AuctionViewResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
