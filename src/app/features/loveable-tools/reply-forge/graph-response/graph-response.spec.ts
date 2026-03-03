import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphResponse } from './graph-response';

describe('GraphResponse', () => {
  let component: GraphResponse;
  let fixture: ComponentFixture<GraphResponse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphResponse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphResponse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
