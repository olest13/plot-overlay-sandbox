import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GreenLineViewComponent } from './green-line-view/green-line-view.component';
import { LinePlotComponent } from './line-plot/line-plot.component';
import { PlotOverlayComponent } from './plot-overlay/plot-overlay.component';
import { RedLineViewComponent } from './red-line-view/red-line-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LinePlotComponent,
    PlotOverlayComponent,
    RedLineViewComponent,
    GreenLineViewComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
