import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/services.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.page.html',
  styleUrls: ['./home-component.page.scss'],
})
export class HomeComponentPage implements OnInit {

  wantSignIn:boolean;
  user:any

  signInform=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
    
  })

  signUpForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
    cnfrmPass:new FormControl('')
  })
  
  constructor(public phoneNumberService:ContactService,public firebaseAuth:AngularFireAuth, public router:Router) { 
    this.wantSignIn=false
    this.user=null

  }

  ngOnInit() {
  }

  changeWindowSignUP()
  {
    if(this.wantSignIn==true)
      this.wantSignIn=false;
      else
        this.wantSignIn=true;
  }

  OnSignUP()
  {
    console.log(this.signUpForm)
    this.router.navigate[('/add-contact')]
    console.log(this.signUpForm.value)
    this.phoneNumberService.singnUp(this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.cnfrmPass);
    console.log("vales-=-------",this.signInform.value.cnfrmPass)
    
  }
  onSignIn()
  {
 
    console.log("vales-=-------",this.signInform.value.password)
    this.phoneNumberService.singnin(this.signInform.value.email, this.signInform.value.password);
  }
}
