import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexReview } from './regex-review';

describe('RegexReview', () => {
  let component: RegexReview;
  let fixture: ComponentFixture<RegexReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegexReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegexReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
