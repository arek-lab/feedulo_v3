import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveableError } from './loveable-error';

describe('LoveableError', () => {
  let component: LoveableError;
  let fixture: ComponentFixture<LoveableError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoveableError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoveableError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
