import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Contact_model } from 'src/app/model/Contact_model';
import { ContactService } from 'src/app/services/services.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.page.html',
  styleUrls: ['./list-contacts.page.scss'],
})
export class ListContactsPage implements OnInit {
  
  phoneNum:any;
  contacts:any;

  constructor( public contactService:ContactService, public nav: NavController, public router:Router,
    public alertController: AlertController, public platform:Platform
    ) {

   
      this.platform.backButton.subscribeWithPriority(-1, () => {
        const url = this.router.url;
    
        if (url === '/tabs/not-home') {
            this.router.navigate(['/tabs/home']);
        } else if (url === '/tabs/home') {
            // App.exitApp();
            navigator['app'].exitApp()
        }
    });
   }

  ngOnInit() {

    console.log("here")
    this.contactService.fetchPhoneNumbers().subscribe(data=>{
    this.contacts=data.map(e=>{

      return{
        id:e.payload.doc.id,
        name:e.payload.doc.data()['name'],
        adress:e.payload.doc.data()['adress'],
        phoneNumber: e.payload.doc.data()['phoneNumber'],
        img:e.payload.doc.data()['img'],
        
      }
    })

  })

  console.log(this.contacts)
    }


  onClickItem(contact)
  {
    this.nav.navigateForward(['/contacts/listContacts/'+contact.id ], { state: this.contacts });
  }


  async logOut()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you really want to  <strong> Log Out</strong>!!!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          id: 'confirm-button',
          handler: async () => {
            console.log('Confirm Okay');
     
            this.contactService.logout();
    
            this.router.navigateByUrl('')

            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Edit',
        
              message: 'Log Out Succesfully.',
              buttons: ['OK']
            });
        
            await alert.present();
          }
        }

      ]
    });

    await alert.present();



  }
}
