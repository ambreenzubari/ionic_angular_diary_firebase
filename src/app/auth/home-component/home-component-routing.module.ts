import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponentPage } from './home-component.page';

const routes: Routes = [
  {
    path: '',
    component: HomeComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeComponentPageRoutingModule {}
