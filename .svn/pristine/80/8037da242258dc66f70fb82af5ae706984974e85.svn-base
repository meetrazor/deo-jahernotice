import { Injectable } from '@angular/core';
import { ServicesService } from '../services.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private dataService: ServicesService) { }

  AddActionExcelData(data){
    return this.dataService.Postdata(`api/AddActionNotice`, data);
  }

  GETAuctionAlertDetails(date : string, Field : string){
    return this.dataService.Getdata(`api/AuctionEmailAlert/${date}?FilterField=${Field}`);
  }

  AuctionEmailSend(data){
    return this.dataService.Postdata(`api/AuctionEmailSend`, data);
  }

  GETAuction(date : string){
    return this.dataService.Getdata(`api/ActionNotice?date=${date}`);
  }
}
