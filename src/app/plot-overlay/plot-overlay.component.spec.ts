import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotOverlayComponent } from './plot-overlay.component';

describe('PlotOverlayComponent', () => {
  let component: PlotOverlayComponent;
  let fixture: ComponentFixture<PlotOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotOverlayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlotOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
