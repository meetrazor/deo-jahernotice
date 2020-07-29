import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { AuctionService } from './auction.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {
  AuctionExcelResult: any = [];
  isLoading: boolean = false;
  issubmit: boolean = false;
  postdata = [];

  isshowAlert: boolean = false;
  AlertMessage: string = '';

  ismergecell: boolean = false;

  ExcelcellHeading = ["SR.N0.", "Published Date", "Notification Date", "District", "Taluka", "Village", "Survey / Block No.", "T.P.No.", "F.P.No.", "Society / Appartment", "Building No. / Plot no", "Area (Sq. Mtrs.)", "Notification Source", "Notification By (Lawyer etc., )", "Name of Borrower", "Client Names/ Title Holder/ Guarantors/ Partners/ Directors/ Borrowers", "Name Of Bank Officer", "Bank Officer Mobile Number", "Bank Branch Details", "Total outstanding amount with interest (Rs.)", "Advance amount to be deposited (bana ni rakam)", "Bank details for depositing advance amount", "Reserve Prize/ Upset Prize (Rs )", "EMD (10/1%(Rs )", "Bid Incremental Amount in Rs", "Date of submitting the bid/tender", "Time", "Details of any outstanding amount to Govt. / local", "Date Inspection", "Time of Inspection", "Date of E-Auction", "Time of E-Auction", "Image Path", "Notice Type", "Property Type", "Loan Account No", "Type Of Loan", "Demand Notice Date", "Property Posseion Date"];

  constructor(private auctionService: AuctionService) { }

  ngOnInit() { }

  downloadFile(){
    let link = document.createElement("a");
    link.download = "filename";
    link.href = "assets/Documents/Auction Module/Auction_Upload_Template.xlsx";
    link.click();
}

  onFileChange(ev) {
    // debugger;
    this.isshowAlert = false;
    this.issubmit = false;
    this.AuctionExcelResult = [];
    this.ismergecell = false;

    if (ev.target.files.length != 0) {
      if (ev.target.files[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {

        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        const file = ev.target.files[0];
        reader.onload = (event) => {
// debugger;
          const data = reader.result;
          
          workBook = XLSX.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            // debugger;
            const sheet = workBook.Sheets[name];
           
            if (sheet['!merges'] != undefined) {

              this.ismergecell = true;
            }
            // debugger;
            initial[name] = XLSX.utils.sheet_to_json(sheet, { raw: true, defval: null });
            return initial;
          }, {});

          // debugger;
          if (this.ismergecell) {
            this.AlertShow(`Your Uploaded excel have merge cell so remove it then upload `)
          }
          else if (Object.keys(jsonData).length === 1) {
            this.postdata = jsonData[Object.keys(jsonData)[0]];
            // debugger;
            if (JSON.stringify(Object.keys(this.postdata[0])) === JSON.stringify(this.ExcelcellHeading)) {

              this.issubmit = true;

            }
            else if (Object.keys(this.postdata[0]).length !== this.ExcelcellHeading.length) {
              this.AlertShow(`Your Uploaded excel have ${Object.keys(this.postdata[0]).length} instead of ${this.ExcelcellHeading.length} `)
            }
            else {
              this.AlertShow(`Your Uploaded excel have Some invalid column name`)
            }

          } else {
            this.AlertShow('Please upload only on sheet')
          }

        }
        reader.readAsBinaryString(file);
      }
      else {
        this.AlertShow('Please upload only .xls Or .xlsx file')
      }
    } else {
      this.AlertShow('Please upload file')
    }
  }

  onClick() {
    this.isshowAlert = false;
    this.isLoading = true;
    this.AuctionExcelResult = [];
    this.postdata.forEach((value, index, array) => {
      value['SR.N0.'] = index + 1;
      
      if(value['Advance amount to be deposited (bana ni rakam)'])
      value['Advance amount to be deposited (bana ni rakam)'] = value['Advance amount to be deposited (bana ni rakam)'].toString();
      
      if(value['Area (Sq. Mtrs.)'])
      value['Area (Sq. Mtrs.)'] = value['Area (Sq. Mtrs.)'].toString();

      if(value['Bank Branch Details'])
      value['Bank Branch Details'] = value['Bank Branch Details'].toString();

      if(value['Bank Officer Mobile Number'])
      value['Bank Officer Mobile Number'] = value['Bank Officer Mobile Number'].toString();

      if(value['Bank details for depositing advance amount'])
      value['Bank details for depositing advance amount'] = value['Bank details for depositing advance amount'].toString();
      
      if(value['Bid Incremental Amount in Rs'])
      value['Bid Incremental Amount in Rs'] = value['Bid Incremental Amount in Rs'].toString();
      
      if(value['Building No. / Plot no'])
      value['Building No. / Plot no'] = value['Building No. / Plot no'].toString();
      
      if(value['Client Names/ Title Holder/ Guarantors/ Partners/ Directors/ Borrowers'])
      value['Client Names/ Title Holder/ Guarantors/ Partners/ Directors/ Borrowers'] = value['Client Names/ Title Holder/ Guarantors/ Partners/ Directors/ Borrowers'].toString();
      
      if(value['Date Inspection'])
      value['Date Inspection'] = value['Date Inspection'].toString();

      if(value['Date of E-Auction'])
      value['Date of E-Auction'] = value['Date of E-Auction'].toString();

      if(value['Date of submitting the bid/tender'])
      value['Date of submitting the bid/tender'] = value['Date of submitting the bid/tender'].toString();
      
      if(value['Demand Notice Date'])
      value['Demand Notice Date'] = value['Demand Notice Date'].toString();
      
      if(value['Details of any outstanding amount to Govt. / local'])
      value['Details of any outstanding amount to Govt. / local'] = value['Details of any outstanding amount to Govt. / local'].toString();
      
      if(value['District'])
      value['District'] = value['District'].toString();

      if(value['EMD (10/1%(Rs )'])
      value['EMD (10/1%(Rs )'] = value['EMD (10/1%(Rs )'].toString();

      if(value['F.P.No.'])
      value['F.P.No.'] = value['F.P.No.'].toString();

      if(value['Image Path'])
      value['Image Path'] = value['Image Path'].toString();

      if(value['Loan Account No'])
      value['Loan Account No'] = value['Loan Account No'].toString();

      if(value['Name Of Bank Officer'])
      value['Name Of Bank Officer'] = value['Name Of Bank Officer'].toString();

      if(value['Name of Borrower'])
      value['Name of Borrower'] = value['Name of Borrower'].toString();

      if(value['Notice Type'])
      value['Notice Type'] = value['Notice Type'].toString();

      if(value['Notification By (Lawyer etc., )'])
      value['Notification By (Lawyer etc., )'] = value['Notification By (Lawyer etc., )'].toString();

      if(value['Notification Date'])
      value['Notification Date'] = value['Notification Date'].toString();

      if(value['Notification Source'])
      value['Notification Source'] = value['Notification Source'].toString();

      if(value['Property Posseion Date'])
      value['Property Posseion Date'] = value['Property Posseion Date'].toString();

      if(value['Property Type'])
      value['Property Type'] = value['Property Type'].toString();

      if(value['Published Date'])
      value['Published Date'] = value['Published Date'].toString();

      if(value['Reserve Prize/ Upset Prize (Rs )'])
      value['Reserve Prize/ Upset Prize (Rs )'] = value['Reserve Prize/ Upset Prize (Rs )'].toString();

      if(value['Society / Appartment'])
      value['Society / Appartment'] = value['Society / Appartment'].toString();

      if(value['Survey / Block No.'])
      value['Survey / Block No.'] = value['Survey / Block No.'].toString();

      if(value['T.P.No.'])
      value['T.P.No.'] =  value['T.P.No.'].toString();

      if(value['Taluka'])
      value['Taluka'] = value['Taluka'].toString();

      if(value['Time'])
      value['Time'] = value['Time'].toString();

      if(value['Time of E-Auction'])
      value['Time of E-Auction'] = value['Time of E-Auction'].toString();

      if(value['Time of Inspection'])
      value['Time of Inspection'] = value['Time of Inspection'].toString();

      if(value['Total outstanding amount with interest (Rs.)'])
      value['Total outstanding amount with interest (Rs.)'] = value['Total outstanding amount with interest (Rs.)'].toString();
      
      if(value['Type Of Loan'])
      value['Type Of Loan'] = value['Type Of Loan'].toString();

      if(value['Village'])
      value['Village'] = value['Village'].toString();


      if (index === array.length - 1) {
        this.auctionService.AddActionExcelData(this.postdata)
          .subscribe((res: { id: number, status: string, error_Level: number, message: string }) => {
            var data: any = [];
            data = res;
            this.AuctionExcelResult = data.sort(function (a, b) {
              return a.id - b.id;
            });
            console.log(this.AuctionExcelResult);
            this.isLoading = false;
          }, error => {
            this.isLoading = false;
            this.AlertShow('Error occurre during API call')
          })
      }
    })
  }

  AlertShow(message: string) {
    this.isshowAlert = true;
    this.AlertMessage = message;
  }

}

