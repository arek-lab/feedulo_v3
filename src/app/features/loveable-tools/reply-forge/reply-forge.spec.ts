import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyForge } from './reply-forge';

describe('ReplyForge', () => {
  let component: ReplyForge;
  let fixture: ComponentFixture<ReplyForge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyForge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyForge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
