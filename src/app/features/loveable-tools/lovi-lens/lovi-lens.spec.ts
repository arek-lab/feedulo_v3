import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoviLens } from './lovi-lens';

describe('LoviLens', () => {
  let component: LoviLens;
  let fixture: ComponentFixture<LoviLens>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoviLens]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoviLens);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
