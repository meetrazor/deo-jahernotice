import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auction-excel-result',
  templateUrl: './auction-excel-result.component.html',
  styleUrls: ['./auction-excel-result.component.scss']
})
export class AuctionExcelResultComponent implements OnInit {
  @Input() data;

  errorNumber : number = 1;

  errorLevel1 : any = [];
  errorLevel2 : any = [];
  errorLevel3 : any = [];
  errorLevel4 : any = [];
  
  constructor() { }

  ngOnInit() {

    this.errorLevel1 = this.data.filter(element => {
      return (element.error_Level === 1);
    });

    this.errorLevel2 = this.data.filter(element => {
      return (element.error_Level === 2);
    });

    this.errorLevel3 = this.data.filter(element => {
      return (element.error_Level === 3);
    });

    this.errorLevel4 = this.data.filter(element => {
      return (element.error_Level === null);
    });

    console.log(this.data);
  }

  onErrorBtn(num){
    this.errorNumber = num;
  }

}
