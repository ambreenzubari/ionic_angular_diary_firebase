import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {provideFirebaseApp, initializeApp} from '@angular/fire/app'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {getFirestore, provideFirestore} from '@angular/fire/firestore'
import { AngularFireModule } from '@angular/fire/compat';
@NgModule({
  declarations: [AppComponent,
    //  HomeComponentPage
    ],
  
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(()=>
      initializeApp(environment.firebase),
      provideFirestore(()=>getFirestore()),
AngularFirestore,
AngularFireAuth
      
  ),
    FormsModule,
     ReactiveFormsModule,
  ],

  
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})


export class AppModule {}
