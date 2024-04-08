import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenLineViewComponent } from './green-line-view.component';

describe('ColoredLineViewComponent', () => {
  let component: GreenLineViewComponent;
  let fixture: ComponentFixture<GreenLineViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GreenLineViewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GreenLineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
