import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-plot-overlay',
  templateUrl: './plot-overlay.component.html',
  styleUrls: ['./plot-overlay.component.scss']
})
export class PlotOverlayComponent {
  @ContentChild('minimizedContent') minimizedContentTemplate: TemplateRef<any>;

  public isMinimized = true;

  public onMinimizeMaximizeClick() {
    this.isMinimized = !this.isMinimized;
  }

  public get hasMinimizedContent(): boolean {
    return !!this.minimizedContentTemplate;
  }

  public onCloseClick() {
    // TODO:9 Apr 2024:oleh.stefanovych:
    // Here we have 2 possible ways to close the overlay:
    // 1. Emit an event to the parent component and let it decide what to do.
    //    In our case we want to remove current object from the list of overlays.
    // 2. Create a flag in this component and apply *ngIf directive to the main div in the template.
  }
}
