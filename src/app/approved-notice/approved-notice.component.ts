import { DatePipe } from '@angular/common';
import { ServicesService } from 'src/app/services.service';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStateChangeEvent, PageChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'app-approved-notice',
  templateUrl: './approved-notice.component.html',
  styleUrls: ['./approved-notice.component.scss']
})
export class ApprovedNoticeComponent implements OnInit, AfterViewInit {
  public value: Date = new Date();
  data: any;
  public gridData;
  public showLoadingIndicator = false;
  imageBase: any;
  edit: boolean;
  id: number;
  public pageSize = 10;
  public skip = 0;
  public type = 'desc';
  public FieldName = 'Publish_date';
  public wherecondition = [];
  public clearButton: string;
  filter: any;
  sort: any;
  filterData = [{ 'IsActiveId': 'Yes', 'IsActive': 'Yes' },
  { 'IsActiveId': 'No', 'IsActive': 'No' }];
  NameFilter = true;
  CommentsFilter = false;
  IsActiveFilter = false;
  UpdatedDateFilter = false;
  UpdatedByFilter = false;
  public Name = 1;
  public Comments = 1;
  public IsActive = 1;
  public UpdatedDate = 1;
  public UpdatedBy = 1;
  constructor(private activatedRoute: ActivatedRoute, private service: ServicesService, private date: DatePipe,
    private cdr: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit() {
    const user = localStorage.getItem('user_type');
    if (user !== '2') {
      this.router.navigate(['/']);
    }
    this.loadDate();
    this.imageBase = this.service.GetBaseUrl() + '/server%20folder%20path/';
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  loadDate() {
    this.showLoadingIndicator = true;
    this.service.GetApprovedNornalNotice(`?skip=${this.skip}&limit=${this.pageSize}&FieldName=${this.FieldName}&type=${this.type}&wherecondition=${JSON.stringify(this.wherecondition)}`)
      .subscribe((Response) => {
        Response.data.map((item) => {
          item.publish_date = this.date.transform(item.publish_date, 'dd-MM-yyyy');
          item.notification_date = this.date.transform(item.notification_date, 'dd-MM-yyyy');
        });
        this.showLoadingIndicator = false;
        // this.gridData = Response.data;
        this.data = Response.data;

        this.gridData = {
          data: Response.data,
          total: Response.TotalRecords
        };
      }, error => {
        console.log('Error occurre during API call');
      });
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.filter = state.filter;
    this.pageSize = state.take;

  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadDate();
  }
  public onSelect(e: any) {

  }
  public filterChange(filter: CompositeFilterDescriptor): void {


    this.skip = 0;
    if (filter.filters.length == 0) {

      if (this.clearButton) {
        // tslint:disable-next-line: prefer-const
        let FieldName = this.clearButton;
        // tslint:disable-next-line: only-arrow-functions
        this.wherecondition = this.wherecondition.filter(function (data) {

          // tslint:disable-next-line: triple-equals
          return data[0].field != FieldName;
        });
        this.loadDate();
        this.filtericoncolor(this.clearButton, false);
      }
    } else {
      let datafilters = JSON.stringify(filter);
      let data = JSON.parse(datafilters).filters;
      data.forEach((element) => {
        let queue = element;
        let FieldName = queue.field;
        this.wherecondition = this.wherecondition.filter(function (data) {

          return data[0].field != FieldName;
        });
        this.filtericoncolor(this.clearButton, true);
      });

      this.wherecondition.push(data);
      this.loadDate();
    }
  }
  filtericoncolor(Filterfieldname: string, condition: boolean) {
    if (Filterfieldname === 'Name') {
      this.NameFilter = condition;
    } else if (Filterfieldname === 'Comments') {
      this.CommentsFilter = condition;
    } else if (Filterfieldname === 'IsActive') {
      this.IsActiveFilter = condition;
    } else if (Filterfieldname === 'UpdatedDate') {
      this.UpdatedDateFilter = condition;
    } else if (Filterfieldname === 'UpdatedBy') {
      this.UpdatedByFilter = condition;
    }
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    let sortData = sort[0];
    this.FieldName = sortData.field;
    this.type = sortData.dir;
    this.loadDate();
  }
  public FilerField(f) {

    this.clearButton = f;
  }
  editApprovedNotice(id) {
    this.id = id;
    this.edit = true;
  }
  editclose(status) {
    this.edit = false;
    this.loadDate();
  }
}
