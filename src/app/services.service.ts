import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpFileUploadOptions = {
  headers: new HttpHeaders()
};

// const baseurl = `http://localhost:3000/`;
// const baseurl = `http://devapi.jahernotice.com/`;
const baseurl = `http://qa.api.jahernotice.com/`;

const apiUrl = `${baseurl}api2`;

const district = `${apiUrl}/District`;
const taluka = `${apiUrl}/Taluka/`;
const village = `${apiUrl}/Village/`;
const societyAppartment = `${apiUrl}/Society/`;
const newspaper = `${apiUrl}/Newspaper/`;
const lawyer = `${apiUrl}/LawyerByLawyerName/`;
const type = `${apiUrl}/NoticeType`;
const upload = `${apiUrl}/NornalNotice`;
const society = `${apiUrl}/Society`;
const newlawyer = `${apiUrl}/Lawyer`;
const approve = `${apiUrl}/ApprovedNornalNotice`;
const fulltaluka = `${apiUrl}/Taluka`;
const edition = `${apiUrl}/Edition`;
const approvedNotice = `${apiUrl}/ApprovedNornalNotice`;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  getDistrict() {
    return this.http.get(district + '?verified=1', httpOptions);
  }

  getTaluka(District) {
    return this.http.get(taluka + District + '?verified=1', httpOptions);
  }

  getVllage(Taluka) {
    return this.http.get(village + Taluka + '?verified=1', httpOptions);
  }

  getSocietyAppartment(Village) {
    return this.http.get(societyAppartment + Village + '?verified=1', httpOptions);
  }

  getNewsPaper() {
    return this.http.get(newspaper, httpOptions);
  }
  getLawyer(key) {
    return this.http.get(lawyer + key + '?verified=1', httpOptions);
  }

  getNoticeType() {
    return this.http.get(type, httpOptions);
  }
  uploadNotice(data): any {
    const formData: FormData = new FormData();
    formData.append('publish_date', data.publish_date);
    formData.append('notification_date', data.notification_date);
    formData.append('district', data.district);
    formData.append('taluka', data.taluka);
    formData.append('village', data.village);
    formData.append('survey', data.survey_block_no);
    formData.append('fpno', data.fp_no);
    formData.append('tpno', data.tp_no);
    formData.append('society', data.society_appartment);
    formData.append('buildingno', data.building_plot);
    formData.append('notifysource', data.notification_source);
    formData.append('notifyby', data.notification_by);
    formData.append('client_names', data.client_name);
    formData.append('notice_type', data.notice_type);
    formData.append('editioncode', data.selectedEdition);
    if (data.issn) {
      formData.append('issrno', data.issn);
    } else {
      formData.append('original_image_path', data.image_path);
      formData.append('Image', data.image, data.image.name);
    }
    return this.http.post(upload, formData, httpFileUploadOptions);
  }
  getAll(url, id): any {
    return this.http.get(`${apiUrl}/${url}/${id}`);
  }

  getOneNotice(id) {
    return this.http.get(upload + '/' + id, httpOptions);
  }

  updateNotice(data, id): any {
    const formData: FormData = new FormData();
    formData.append('publish_date', data.publish_date);
    formData.append('notification_date', data.notification_date);
    formData.append('district', data.district);
    formData.append('taluka', data.taluka);
    formData.append('village', data.village);
    formData.append('survey', data.survey_block_no);
    formData.append('fpno', data.fp_no);
    formData.append('tpno', data.tp_no);
    formData.append('society', data.society_appartment);
    formData.append('buildingno', data.building_plot);
    formData.append('notifysource', data.notification_source);
    formData.append('notifyby', data.notification_by);
    formData.append('client_names', data.client_name);
    formData.append('notice_type', data.notice_type);
    formData.append('editioncode', data.selectedEdition);
    if (data.image) {
      formData.append('original_image_path', data.image_path);
      formData.append('Image', data.image, data.image.name);
    }
    return this.http.put(upload + '/' + id, formData, httpFileUploadOptions);
  }

  addNewSociety(data): any {
    return this.http.post(society, data, httpOptions);
  }
  addnewLawyer(data): any {
    return this.http.post(newlawyer, data, httpOptions);
  }
  approvedNornalNotice(id): any {
    return this.http.post(approve + '/' + id, '', httpOptions);
  }
  deleteNormalNotice(id): any {
    return this.http.delete(upload + '/' + id, httpOptions);
  }
  getAllTakula(): any {
    return this.http.get(fulltaluka + '?verified=1', httpOptions);
  }


  getEdition(): any {
    return this.http.get(edition, httpOptions);
  }

  Postdata(url: string, data) {
    return this.http.post(`${baseurl}${url}`, data);
  }

  Getdata(url: string) {
    return this.http.get(`${baseurl}${url}`);
  }
  GetBaseUrl() {
    return baseurl;
  }
  GetAllNormalNotice(): any {
    return this.http.get(`${baseurl}api2/NornalNotice`, httpOptions);
  }
  GetApprovedNornalNotice(URL): any {
    return this.http.get(approvedNotice + URL, httpOptions);
  }
  GetOneApprovedNotice(id): any {
    return this.http.get(approvedNotice + '/' + id, httpOptions);
  }

  updateApprovedNotice(data, id): any {
    const formData: FormData = new FormData();
    formData.append('publish_date', data.publish_date);
    formData.append('notification_date', data.notification_date);
    formData.append('district', data.district);
    formData.append('taluka', data.taluka);
    formData.append('village', data.village);
    formData.append('survey', data.survey_block_no);
    formData.append('fpno', data.fp_no);
    formData.append('tpno', data.tp_no);
    formData.append('society', data.society_appartment);
    formData.append('buildingno', data.building_plot);
    formData.append('notifysource', data.notification_source);
    formData.append('notifyby', data.notification_by);
    formData.append('client_names', data.client_name);
    formData.append('notice_type', data.notice_type);
    formData.append('editioncode', data.selectedEdition);
    if (data.image) {
      formData.append('original_image_path', data.image_path);
      formData.append('Image', data.image, data.image.name);
    }
    return this.http.put(approvedNotice + '/' + id, formData, httpFileUploadOptions);
  }
}

