import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-view-auction',
  templateUrl: './view-auction.component.html',
  styleUrls: ['./view-auction.component.scss']
})
export class ViewAuctionComponent implements OnInit {
  public value: Date = new Date();
  public gridData;
  public pageSize = 10;
  public skip = 0;
  public showLoadingIndicator : boolean = false;

  constructor(private activatedRoute : ActivatedRoute, private auctionService : AuctionService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.gridData = data.Auction;
     
    })
  }

  onDateChange(e){
    this.loadDate();
  }

  // refresh grid 
  loadDate(){
    this.showLoadingIndicator = true;
    var d = new Date(this.value)
    this.auctionService.GETAuction(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
    .subscribe(data => {
      this.showLoadingIndicator = false;
      this.gridData = data;
      debugger;
    }, error => {
      console.log('Error occurre during API call')
    })
  }
}
