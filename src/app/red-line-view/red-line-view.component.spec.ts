import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedLineViewComponent } from './red-line-view.component';

describe('ColoredLineViewComponent', () => {
  let component: RedLineViewComponent;
  let fixture: ComponentFixture<RedLineViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedLineViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedLineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
