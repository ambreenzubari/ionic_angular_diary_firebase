import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDeleteContactPageRoutingModule } from './edit-delete-contact-routing.module';

import { EditDeleteContactPage } from './edit-delete-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDeleteContactPageRoutingModule,
    ReactiveFormsModule,
    
  ],
  exports:[FormsModule,
    ReactiveFormsModule],
  declarations: [EditDeleteContactPage]
})
export class EditDeleteContactPageModule {}
