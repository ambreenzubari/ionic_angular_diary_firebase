import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contact_model } from 'src/app/model/Contact_model';
import { ContactService } from 'src/app/services/services.service';

@Component({
  selector: 'app-edit-delete-contact',
  templateUrl: './edit-delete-contact.page.html',
  styleUrls: ['./edit-delete-contact.page.scss'],
})
export class EditDeleteContactPage implements OnInit {
  url: string;
  file: File;
  extras: any;
  contact:Contact_model={id:"", adress:"", name:"", phoneNumber:"", img:""}
  // contacts:any;


  EditForm=new FormGroup({
          name:new FormControl(''),
          adress:new FormControl(''),
          phoneNumber:new FormControl('')
        })

    constructor(
    private actRouter:ActivatedRoute,
    public contactService:ContactService,
    // public contacts:any

    public router:Router,
    public alertController: AlertController
  ) { 

    if (router.getCurrentNavigation().extras.state) {
      const pageName = this.router.getCurrentNavigation().extras.state;
      console.log("PAGE NAME IS HERE: ",pageName) 
      console.log(pageName)
      this.actRouter.paramMap.subscribe(paramMap=>{
        if(!paramMap.has('contactId'))
        {
          console.log("not id")
          return
        }
        else{
          const id=paramMap.get('contactId')
          
          this.contact= {...pageName.find(cont=>{
    
            console.log("chkong")
          return  id===cont.id
        })}
    
        }
      })
      
      

  
  
    }
  }

  ngOnInit() {

    console.log("here COntact Edit")

        console.log("contact",this.contact)

        this.EditForm=new FormGroup({
          name:new FormControl(this.contact.name),
          adress:new FormControl(this.contact.adress),
          phoneNumber:new FormControl(this.contact.phoneNumber)
        })
        this.url=this.contact.img
        
      // }
    // })
      
  }


  

  onSelectFile(event:any)
  {
    let temp=event.target.files[0]
    console.log(temp)
    // if(event.target.files)
    {
      let reader=new FileReader();
      reader.readAsDataURL(temp)
      reader.onload=(event:any)=>{
        this.url=event.target.result
        this.file=temp
        // alert("here")
        console.log(this.file)
      }
    }
  }


  async onSubmitEdit()
  {

    
    this.contact.name=this.EditForm.value.name;
    this.contact.adress=this.EditForm.value.adress;
    this.contact.phoneNumber=this.EditForm.value.phoneNum;
    this.contact.img=this.url;
    console.log(this.contact)
    this.contactService.editItemFireStore(JSON.parse(JSON.stringify(this.contact)));

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit',

      message: 'Item edit Succesfully.',
      buttons: ['OK']
    });

    await alert.present();
    this.router.navigateByUrl('/contacts/listContacts')


    console.log("item edited succesfully")
  }

  async onClickDelete()
  {
    console.log("click on item delete")

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you really want to  <strong> Delete Contact</strong>!!!',
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
            this.contactService.deleteItem(this.contact.id)
            this.router.navigateByUrl('/contacts/listContacts')

            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Edit',
        
              message: 'Item Deleted Succesfully.',
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
