import { ServicesService } from 'src/app/services.service';
import { Subscriber } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() approvedNoticeId: number
  @Input() id: number;
  // tslint:disable-next-line: ban-types
  @Output() sendMessage: EventEmitter<String> = new EventEmitter<String>();
  loading: boolean;
  lastInsertedImageName;
  newsPaperObject: any;
  pinchzoom = 'rgba(0,0,0,0);';
  overflow = 'visible';
  newSociety: boolean;
  imageGallery = [];
  URLs = [];
  District: any;
  index = 0;
  newlawyer: boolean;
  image: any;
  @ViewChild('selectedImages', { static: false }) selectedImages: ElementRef;
  taluka: any;
  village: any;
  edition: any;
  societyAppartment: any;
  newsPapers: any;
  keyword = 'name';
  lawyers: any;
  noticeTypes: any;
  anotherNotice: any;
  imageNumber: number;
  uploadObject: {
    issn: string;
    publish_date: string,
    notification_date: string,
    district: string,
    taluka: string,
    village: string,
    tp_no: string,
    fp_no: string,
    society_appartment: string,
    building_plot: string,
    notification_source: string,
    notification_by: string,
    client_name: string,
    notice_type: string,
    image: any,
    survey_block_no: string,
    image_path: string,
    selectedEdition: string,
  };
  district2: string;
  taluka2: string;
  society2: string;
  village2: string;
  source2: any;
  by2: string;
  law2: string;
  temptaluka: string;
  tempvillage: string;
  tempsociety: string;
  tempsource: string;
  tempdistrict: string;
  constructor(private service: ServicesService, private toastr: ToastrService, private datePipe: DatePipe,
    // tslint:disable-next-line: align
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.image = this.service.GetBaseUrl() + 'server%20folder%20path/';
    if ((this.id) || (this.approvedNoticeId)) {
      this.loading = true;
      this.getDistrict();
      if (this.id) {
        this.service.getOneNotice(this.id).subscribe((data) => {
          this.reset();
          // tslint:disable-next-line: prefer-const
          for (let key of Object.keys(data[0])) {
            if (data[0][key] === null) {
              data[0][key] = '';
            }
          }

          this.uploadObject = {
            publish_date: this.datePipe.transform(data[0].publish_date, 'yyyy-MM-dd'),
            notification_date: this.datePipe.transform(data[0].notification_date, 'yyyy-MM-dd'),
            district: null,
            taluka: null,
            village: null,
            tp_no: data[0].tpno,
            fp_no: data[0].fpno,
            society_appartment: '',
            building_plot: data[0].buildingno,
            notification_source: data[0].notifysource,
            notification_by: data[0].notifyby,
            client_name: data[0].client_names,
            notice_type: data[0].notice_type,
            image: '',
            survey_block_no: data[0].survey,
            image_path: data[0].image_path,
            selectedEdition: data[0].editioncode,
            issn: ''
          };
          this.image += data[0].image_path;
          this.by2 = data[0].notice_type;
          this.tempdistrict = data[0].district;
          this.temptaluka = data[0].taluka;
          this.law2 = data[0].notifyby;
          this.tempsource = data[0].notifysource;
          this.tempvillage = data[0].village;
          this.loading = false;
          this.tempsociety = data[0].society;
        });
      } else if (this.approvedNoticeId) {
        this.service.GetOneApprovedNotice(this.approvedNoticeId).subscribe((data) => {
          this.reset();
          this.loading = true;
          // tslint:disable-next-line: prefer-const
          for (let key of Object.keys(data.data[0])) {
            if (data.data[0][key] === null) {
              data.data[0][key] = '';
            }
          }

          this.uploadObject = {
            publish_date: this.datePipe.transform(data.data[0].publish_date, 'yyyy-MM-dd'),
            notification_date: this.datePipe.transform(data.data[0].notification_date, 'yyyy-MM-dd'),
            district: null,
            taluka: null,
            village: null,
            tp_no: data.data[0].tpno,
            fp_no: data.data[0].fpno,
            society_appartment: '',
            building_plot: data.data[0].buildingno,
            notification_source: data.data[0].notifysource,
            notification_by: data.data[0].notifyby,
            client_name: data.data[0].client_names,
            notice_type: data.data[0].notice_type,
            image: '',
            survey_block_no: data.data[0].survey,
            image_path: data.data[0].image_path,
            selectedEdition: data.data[0].editioncode,
            issn: ''
          };
          this.image += data.data[0].image_path;
          this.by2 = data.data[0].notice_type;
          this.tempdistrict = data.data[0].district;
          this.temptaluka = data.data[0].taluka;
          this.law2 = data.data[0].notifyby;
          this.tempsource = data.data[0].notifysource;
          this.tempvillage = data.data[0].village;
          this.tempsociety = data.data[0].society;
          this.loading = false;
        });
      }
    } else {
      this.reset();
      this.getDistrict();
      this.imageNumber = 1;
    }

  }
  imageNumberChange() {
    if (this.imageNumber > this.URLs.length) {
      this.toastr.error('image Number is Greater then Total Images', 'Total ' + this.URLs.length + ' images');
    } else {
      this.index = this.imageNumber - 1;
    }
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const file = event.target.files[i];
        const mimeType = file.type;
        if (((mimeType.match(/image\/jpg/) == null) && (mimeType.match(/image\/jpeg/) == null))) {
          this.toastr.error('only jpeg and jpg image support', file.name + ' is invelid image');
          break;
        } else {
          this.imageGallery.push(event.target.files[i]);
          // this.URLs.push(file);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.URLs.push(reader.result);
          };
        }
      }
    }
  }
  next() {
    if (this.imageNumber > this.URLs.length - 1) {

    } else {
      this.index++;
      this.imageNumber = this.index + 1;
    }
    // this.URLs.shift();
    // // this.selectedImages.nativeElement.value = '';
    // this.imageGallery.shift();
  }
  privious() {
    this.index--;
    this.imageNumber = this.index + 1;
  }

  getDistrict() {
    this.service.getDistrict().subscribe(response => {
      this.District = response;
    });
    this.service.getNewsPaper().subscribe(newsPaper => {
      this.newsPapers = newsPaper;
    });
    this.service.getNoticeType().subscribe(types => {
      this.noticeTypes = types;
    });
    this.service.getEdition().subscribe(edition => {
      this.edition = edition;
    });
  }
  selectDistrict(District) {
    District = JSON.parse(District);
    this.service.getTaluka(District.id).subscribe(taluka => {
      this.taluka = taluka;
    });
    this.uploadObject.district = District.districtname;
    this.taluka2 = '';
    this.village2 = '';
    this.uploadObject.taluka = '';
    this.uploadObject.village = '';
    this.uploadObject.society_appartment = '';
    this.temptaluka = '';
    this.tempvillage = '';
    this.tempsociety = '';
  }
  selectTaluka(taluka) {
    taluka = JSON.parse(taluka);
    this.service.getVllage(taluka.id).subscribe(village => {
      this.village = village;
    });
    this.uploadObject.taluka = taluka.blockname;
    this.village2 = '';
    this.uploadObject.village = '';
    this.uploadObject.society_appartment = '';
    this.tempvillage = '';
    this.tempsociety = '';
  }

  selectVillage(village) {
    village = JSON.parse(village);
    this.service.getSocietyAppartment(village.id).subscribe(socApp => {
      this.societyAppartment = socApp;
    });
    this.uploadObject.village = village.villagename;
    this.uploadObject.society_appartment = '';
    this.tempsociety = '';
  }
  onChangeSearch(event) {
    if (event) {
      this.service.getLawyer(event).subscribe(lawyers => {
        this.lawyers = lawyers;
      });
    }
  }
  removeImages() {
    this.URLs = [];
    this.imageGallery = [];
    this.index = 0;
    this.imageNumber = 1;
    this.image = '';
  }
  selectEvent(event) {
    this.uploadObject.notification_by = event.name;
  }
  noticeSelect(value) {
    this.uploadObject.notice_type = value;
  }
  sourceSelect(value) {
    if (value) {
      value = JSON.parse(value);
      this.newsPaperObject = value;
      this.uploadObject.notification_source = value.papername;
      this.tempsource = '';

    }
  }

  reset() {
    this.getDistrict();
    this.uploadObject = {
      publish_date: '',
      notification_date: '',
      district: '',
      taluka: '',
      village: '',
      tp_no: '',
      fp_no: '',
      society_appartment: '',
      building_plot: '',
      notification_source: '',
      notification_by: '',
      client_name: '',
      notice_type: null,
      image: '',
      survey_block_no: '',
      image_path: '',
      selectedEdition: '',
      issn: '',
    };
    this.district2 = '';
    this.taluka2 = '';
    this.by2 = '';
    this.village2 = '';
    this.source2 = '';
    this.law2 = '';

  }
  OnSelectEdition(value) {
    if (!this.id) {
      // tslint:disable-next-line: max-line-length
      this.uploadObject.image_path = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + this.newsPaperObject.shortcode;
    }
  }
  upload(form) {
    if (form.valid) {
      // let srno = null;
      this.uploadObject.image = this.imageGallery[this.index];
      // tslint:disable-next-line: max-line-length
      if ((this.uploadObject.image) && (this.uploadObject.client_name !== '') && (this.uploadObject.district !== '') && (this.uploadObject.image_path !== '') && (this.uploadObject.notice_type !== '') && (this.uploadObject.notification_by !== '') && (this.uploadObject.notification_date !== '') && (this.uploadObject.notification_source !== '') && (this.uploadObject.publish_date !== '') && (this.uploadObject.taluka !== '') && (this.uploadObject.village !== '')) {
        if (!this.anotherNotice) {
          this.service.uploadNotice(this.uploadObject).subscribe(Response => {
            if (Response.srno) {
              this.toastr.success(Response.message, 'Success');
              this.lastInsertedImageName = Response.srno;
              this.reset();
              if (!this.anotherNotice) {
                this.next();
              }
            } else {
              this.toastr.error('Somethings Wrong', 'Error');
            }
          });
        } else {
          this.uploadObject.issn = this.lastInsertedImageName;
          this.service.uploadNotice(this.uploadObject).subscribe(Response => {
            if (Response.srno) {
              this.toastr.success(Response.message, 'Success');
              this.reset();
            } else {
              this.toastr.error('Somethings Wrong', 'Error');
            }
          });
        }
      } else {
        this.toastr.error('All (*) mark fileds are mandatory', 'Error');
      }

    }
  }
  closePopUp(status) {
    this.sendMessage.emit(status);
  }
  societyclose(status) {

    this.newSociety = false;
  }
  onUpdateFile(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {

      } else {
        this.uploadObject.image = file;
        // this.URLs.push(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.image = reader.result;
        };
      }
    }
  }
  lawyerclose(status) {

    this.newlawyer = false;
  }

  update() {
    // tslint:disable-next-line: max-line-length
    if ((this.uploadObject.district === null) || (this.uploadObject.taluka === null) || (this.uploadObject.village === null) || (this.uploadObject.society_appartment === null)) {
      this.uploadObject.district = this.tempdistrict;
      this.uploadObject.taluka = this.temptaluka;
      this.uploadObject.village = this.tempvillage;
      this.uploadObject.society_appartment = this.tempsociety;
    }
    if (this.uploadObject.notification_source === '') {
      this.uploadObject.notification_source = this.source2;
    }
    if (this.uploadObject.society_appartment === '') {
      this.uploadObject.society_appartment = null;
    }
    if (this.uploadObject.fp_no === '') {
      this.uploadObject.fp_no = null;
    }
    if (this.uploadObject.tp_no === '') {
      this.uploadObject.tp_no = null;
    }
    if (this.uploadObject.survey_block_no === '') {
      this.uploadObject.survey_block_no = null;
    }
    if (this.uploadObject.building_plot === '') {
      this.uploadObject.building_plot = null;
    }
    // tslint:disable-next-line: max-line-length
    if (((this.uploadObject.image) || (this.image)) && (this.uploadObject.client_name) && (this.uploadObject.district) && (this.uploadObject.image_path) && (this.uploadObject.notice_type) && (this.uploadObject.notification_by) && (this.uploadObject.notification_date) && (this.uploadObject.notification_source) && (this.uploadObject.publish_date) && (this.uploadObject.taluka) && (this.uploadObject.village)) {
      if (this.id) {
        this.service.updateNotice(this.uploadObject, this.id).subscribe((res) => {
          if (res.Message === 'Data Succesfully updated') {
            this.toastr.success(res.message, 'Success');
            this.closePopUp('refresh');
          } else {
            this.toastr.error('Error');
          }
        });
      } else if (this.approvedNoticeId) {
        this.service.updateApprovedNotice(this.uploadObject, this.approvedNoticeId).subscribe((res) => {
          if (res.message === 'Notice successfully Add to UnApproved Queue') {
            this.toastr.success(res.message, 'Success');
            this.closePopUp('refresh');
          } else {
            this.toastr.error('Error');
          }
        });
      }
    } else {
      this.toastr.error('All (*) mark fileds are mandatory', 'Error');
    }
  }
}


