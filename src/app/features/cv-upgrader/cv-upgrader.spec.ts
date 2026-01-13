import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvUpgrader } from './cv-upgrader';

describe('CvUpgrader', () => {
  let component: CvUpgrader;
  let fixture: ComponentFixture<CvUpgrader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvUpgrader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvUpgrader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
