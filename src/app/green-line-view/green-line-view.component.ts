import { Component, Input, HostListener, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DataPoint, LinePlotData } from '../line-plot/line-plot-data';
import { LinePlotSelectionEvent } from '../line-plot/line-plot-selection-event';

interface GreenViewOverlayData {
  currentPosition: { x: number; y: number };
  startX: number;
  value: string;
  // any other fields here to display in the overlay
}

const COLOR = "#3dff21";

@Component({
  selector: 'app-green-line-view',
  templateUrl: './green-line-view.component.html',
  styleUrls: ['./green-line-view.component.scss']
})
export class GreenLineViewComponent {

  public linePlotData: LinePlotData;
  public overlays: GreenViewOverlayData[] = [];

  // Mouse client position (x, y) relative to the component.
  private mousePosition: { x: number; y: number };

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  @Input()
  public set points(points: DataPoint[]) {
    this.linePlotData = {
      color: COLOR,
      points
    };
  }

  public onLinePlotSelectionStart(): void {
    this.overlays.push({
      currentPosition: {
        x: this.mousePosition.x,
        y: this.mousePosition.y - 10
      },
      startX: this.mousePosition.x,
      value: "0"
    });
  }

  public onLinePlotSelectionChange(event: LinePlotSelectionEvent): void {
    const currentOverlayData = this.overlays[this.overlays.length - 1];

    currentOverlayData.value = Math.abs(event.start - event.end).toFixed(2);
    currentOverlayData.currentPosition = {
      ...currentOverlayData.currentPosition,
      x: (this.mousePosition.x + currentOverlayData.startX) / 2,
    };
  }

  @HostListener("mousemove", ["$event"])
  private onMouseMove(event: MouseEvent): void {
    const componentElement = this.viewContainerRef.element.nativeElement as HTMLElement;
    const bounds = componentElement.getBoundingClientRect();

    this.mousePosition = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    };
  }
}
