import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleLoader } from './bubble-loader';

describe('BubbleLoader', () => {
  let component: BubbleLoader;
  let fixture: ComponentFixture<BubbleLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleLoader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
