import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ContactService } from './services/services.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
  user:any;
  constructor(public phoneNumberService:ContactService,public firebaseAuth:AngularFireAuth, public router:Router) { 
    this.user=null
    // this.isSignIn=false
    
    this.firebaseAuth.authState.subscribe(m_user=>{
      console.log("UId",m_user.uid)
      this.user=m_user.uid
      
      if(this.user!=null)
      {
        console.log(":here")
        this.router.navigateByUrl('/contacts/listContacts')
      }
      else
      this.router.navigateByUrl('')
     
      
      console.log(m_user)
    })
    // phoneNumberService.logout()
  }


}
