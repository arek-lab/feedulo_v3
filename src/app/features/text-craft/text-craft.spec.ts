import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCraft } from './text-craft';

describe('TextCraft', () => {
  let component: TextCraft;
  let fixture: ComponentFixture<TextCraft>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextCraft]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextCraft);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
