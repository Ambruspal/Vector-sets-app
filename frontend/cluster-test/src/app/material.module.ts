import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [MatSidenavModule, MatListModule, MatButtonModule, DragDropModule],
  exports: [MatSidenavModule, MatListModule, MatButtonModule, DragDropModule],
})
export class MaterialModule {}
