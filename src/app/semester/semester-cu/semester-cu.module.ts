import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SemesterCuPage } from './semester-cu.page';

const routes: Routes = [
  {
    path: '',
    component: SemesterCuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SemesterCuPage]
})
export class SemesterCuPageModule {}
