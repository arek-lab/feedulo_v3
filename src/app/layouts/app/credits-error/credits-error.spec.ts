import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsError } from './credits-error';

describe('CreditsError', () => {
  let component: CreditsError;
  let fixture: ComponentFixture<CreditsError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditsError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditsError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
