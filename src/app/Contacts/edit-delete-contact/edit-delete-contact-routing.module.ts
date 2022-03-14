import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDeleteContactPage } from './edit-delete-contact.page';

const routes: Routes = [
  {
    path: '',
    component: EditDeleteContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDeleteContactPageRoutingModule {}
