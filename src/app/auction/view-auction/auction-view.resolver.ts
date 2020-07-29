import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuctionService } from '../auction.service';

@Injectable({
    providedIn: 'root'
    })
    export class AuctionViewResolver implements Resolve<any> {
      constructor(private auctionService : AuctionService) { }

      resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
          var d = new Date();
        return this.auctionService.GETAuction(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
      }
    }