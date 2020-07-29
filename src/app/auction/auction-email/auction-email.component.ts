import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auction-email',
  templateUrl: './auction-email.component.html',
  styleUrls: ['./auction-email.component.scss']
})
export class AuctionEmailComponent implements OnInit {
  public value: Date = new Date();
  public gridData;
  public gridDataDetail;
  public FilterField : string = 'ALL';
  public mySelection: number[] = [];
  public showLoadingIndicator : boolean = false;
  public opened = false;
  public pageSize = 10;
  public skip = 0;

  public expandedDetailKeys: any[] = [1];

    public expandDetailsBy = (dataItem: any): any  => {
        return dataItem.ID;
    }

  constructor(private auctionService : AuctionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // resolver call at this point for fetch grid data
    this.activatedRoute.data.subscribe((data) => {

      this.gridData = data.users.sort((a, b) => {
        return a.ID - b.ID
      });
      console.log(this.gridData);
     
    })
  }

  // When we change date from datepicker
  onDateChange(e){
    this.loadDate();
  }

  //  we you select Village, Taluka, District or All 
  onSelectFilterField(field : string){
    this.FilterField = field;
    this.loadDate();
  }

  // when you select or deselect any checkbox from grid
  onSelectedKeysChange(){
    // console.log(this.mySelection, 'onSelectedKeysChange');
  }

  // When you click send or resend button
  onItembtnClick(id : number){
    console.log(new Date(), '*************Start..*************')
    this.showLoadingIndicator = true;

    var SelectedItem = this.gridData.filter(a => {
      return a.ID === id;
    })
    console.log(SelectedItem);
    this.auctionService.AuctionEmailSend(SelectedItem).subscribe((data) => {
      console.log(data);
      this.showLoadingIndicator = false;
      console.log(new Date(), '*************end..*************')
      this.loadDate()
    });
  }

  // When you click send mail to all selected client
  AllCheckboxClick(){
    console.log(new Date(), '*************Start..*************')
    this.showLoadingIndicator = true;
    console.log(this.mySelection);
    var SelectedItem = this.gridData.filter(a => {
      return this.mySelection.includes(a.ID);
    })
    console.log(SelectedItem);
    if(SelectedItem.length === 0){
      this.showLoadingIndicator = false;
    }else{
      this.auctionService.AuctionEmailSend(SelectedItem).subscribe((data) => {
        console.log(data);
        this.showLoadingIndicator = false;
        console.log(new Date(), '*************End..*************')
        this.loadDate()
      });
    }
  }

  // View email data
  viewClick(id: number){
    this.showLoadingIndicator = true;
    this.open();
    this.gridDataDetail = this.gridData.filter(a => {
      return a.ID === id;
    })[0].Data;
    this.showLoadingIndicator = false;
    this.open();
  }

  // refresh grid 
  loadDate(){
    this.showLoadingIndicator = true;
    var d = new Date(this.value)
    this.mySelection = [];
    
    console.log('refresh grid ........', new Date(), '-------');
    this.auctionService.GETAuctionAlertDetails(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`, this.FilterField)
    .subscribe(data => {
      console.log('refresh grid Done', new Date(), '-------'); 
      this.showLoadingIndicator = false;
      this.gridData = data;
      this.gridData = this.gridData.sort((a, b) => {
        return a.ID - b.ID
      });
      console.log(this.gridData)
    }, error => {
      console.log('Error occurre during API call')
    })
  }

  // Dialog box
  public close(status) {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
    this.showLoadingIndicator = false;
    this.gridDataDetail = [];
  }

  public open() {
    this.opened = true;
  }

}
