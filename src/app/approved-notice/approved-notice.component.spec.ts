import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedNoticeComponent } from './approved-notice.component';

describe('ApprovedNoticeComponent', () => {
  let component: ApprovedNoticeComponent;
  let fixture: ComponentFixture<ApprovedNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
