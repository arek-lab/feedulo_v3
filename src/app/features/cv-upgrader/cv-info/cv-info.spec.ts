import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvInfo } from './cv-info';

describe('CvInfo', () => {
  let component: CvInfo;
  let fixture: ComponentFixture<CvInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
