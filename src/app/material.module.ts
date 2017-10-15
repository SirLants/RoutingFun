import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule } from '@angular/material';

import { NgModule } from '@angular/core';

@NgModule({
 imports: [
   MatButtonModule,
   MatMenuModule,
   MatToolbarModule,
   MatIconModule,
   MatCardModule],
 exports: [
   MatButtonModule,
   MatMenuModule,
   MatToolbarModule,
   MatIconModule,
   MatCardModule]
})
export class MaterialModule { }
