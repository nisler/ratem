import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssignmentDetailsPage } from './assignment-details.page';

const routes: Routes = [
  {
    path: '',
    component: AssignmentDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssignmentDetailsPage]
})
export class AssignmentDetailsPageModule {}
