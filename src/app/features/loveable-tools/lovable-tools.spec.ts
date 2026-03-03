import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovableTools } from './lovable-tools';

describe('LovableTools', () => {
  let component: LovableTools;
  let fixture: ComponentFixture<LovableTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LovableTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovableTools);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
