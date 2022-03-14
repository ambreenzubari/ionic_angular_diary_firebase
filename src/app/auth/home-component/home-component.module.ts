import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeComponentPageRoutingModule } from './home-component-routing.module';

import { HomeComponentPage } from './home-component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeComponentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponentPage],
  exports:[HomeComponentPage,
    ReactiveFormsModule,
    FormsModule]
})
export class HomeComponentPageModule {}
