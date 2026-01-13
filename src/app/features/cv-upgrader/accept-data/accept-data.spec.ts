import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptData } from './accept-data';

describe('AcceptData', () => {
  let component: AcceptData;
  let fixture: ComponentFixture<AcceptData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
