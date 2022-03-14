import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Contact_model } from 'src/app/model/Contact_model';
import { ContactService } from 'src/app/services/services.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  file:File
  url="https://www.clipartmax.com/png/middle/110-1104174_computer-icons-user-clip-art-lily-pad-coloring-page.png"

  phoneNumber_instance: Contact_model={
    id: "", name: "", adress: '', img: "",
    phoneNumber: ''
  };
  addForm=new FormGroup({
    name: new FormControl(''),
    adress:new FormControl(''),
    phoneNumber:new FormControl('')

  })
  constructor(public phoneNumberService:ContactService, public firebaseDatabase:AngularFireStorage,) { }

  ngOnInit() {
  }

  onSubmitBtn()
  {
    console.log(this.addForm)
    console.log(this.addForm)

    console.log(this.url)
    this.phoneNumber_instance.name=this.addForm.value.name;
    this.phoneNumber_instance.adress=this.addForm.value.adress;
    this.phoneNumber_instance.img=this.url;
    this.phoneNumber_instance.phoneNumber=this.addForm.value.phoneNumber;

    if(this.file!=undefined)
    {
      let storageRef=this.firebaseDatabase.storage.ref()
   
      const task: AngularFireUploadTask = this.firebaseDatabase.upload(
        this.file.name,
        this.file
      );
      task
          .snapshotChanges()
          .pipe(
          finalize(() => {
              storageRef.getDownloadURL().then(async downloadURL => {
                  console.log(downloadURL);
                  this.url=downloadURL;

                        await new Promise(r => setTimeout(r, 2000));
              }).catch(e=>{
                alert(e)
              });
        })
    )
    .subscribe();
  
    }

    this.phoneNumber_instance.img=this.url;


    this.phoneNumberService.createNewPhoneNumber(JSON.parse(JSON.stringify(this.phoneNumber_instance))).then(res=>{
      this.addForm=new FormGroup({
        name: new FormControl(''),
        adress:new FormControl(''),
        phoneNumber:new FormControl('')
      })
       this.url="https://www.clipartmax.com/png/middle/110-1104174_computer-icons-user-clip-art-lily-pad-coloring-page.png";
      
    }).catch(error=>{
        console.log(error)
    });


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
}
