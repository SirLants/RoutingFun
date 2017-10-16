import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatTabsModule,
  MatCheckboxModule } from '@angular/material';

import { NgModule } from '@angular/core';

@NgModule({
 imports: [
   MatButtonModule,
   MatMenuModule,
   MatToolbarModule,
   MatIconModule,
   MatCardModule,
   MatTabsModule,
   MatCheckboxModule],
 exports: [
   MatButtonModule,
   MatMenuModule,
   MatToolbarModule,
   MatIconModule,
   MatCardModule,
   MatTabsModule,
   MatCheckboxModule]
})
export class MaterialModule { }
