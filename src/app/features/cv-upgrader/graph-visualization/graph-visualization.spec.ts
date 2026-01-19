import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphVisualization } from './graph-visualization';

describe('GraphVisualization', () => {
  let component: GraphVisualization;
  let fixture: ComponentFixture<GraphVisualization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphVisualization]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphVisualization);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
