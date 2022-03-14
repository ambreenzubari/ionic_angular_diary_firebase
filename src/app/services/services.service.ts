import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Contact_model } from '../model/Contact_model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts=[
  
  ]
  user=null
  isLoggedIn=false;
  fireStore:AngularFirestore;
  phoneNum:Contact_model[];
  
  constructor(public fireS:AngularFirestore, public firebaseAuth:AngularFireAuth, private router:Router)  {
    this.fireStore=fireS;
    // console.log("auth state: ",firebaseAuth.authState)
    this.firebaseAuth.authState.subscribe(m_user=>{
      this.user=m_user.uid
      // console.log(m_user)
    })
    }


  async getUser()
  {

    // this.user=((await this.firebaseAuth.currentUser).uid)    
    //this.user= JSON.parse(window.localStorage.getItem('user')).uid
  }
  async singnin(email: string, password: string)
  {
    this.firebaseAuth.setPersistence('local').then(()=>{
     this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(async res=>{
        this.isLoggedIn=true;  
        
        // console.log(JSON.parse(JSON.stringify(res.user.uid)))
        this.user=res.user.uid
        this.router.navigateByUrl('/contacts/listContacts')
       // localStorage.setItem('user', JSON.stringify(res.user))
      }).catch(e=>{
        console.log(e)
        alert(e)
      })
  
    })
  }

  async singnUp(email: string, password: string, confirm: string)
  {
   
    // console.log("password: ",password,"cnfrm: ", confirm)
    if(password===confirm)
    {
      if(password.length>6)
      {
        await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
       .then(res=>{
        var Record={
          "email": email,
          "password": password
        }
    
        this.isLoggedIn=true;
      //  localStorage.setItem('user', JSON.stringify(res.user))
        this.router.navigate[('/contacts/listContacts')]
      //  this.getUser()

        this.router.navigateByUrl('/contacts/listContacts')

      }).catch(e=>{
        console.log(e)
        alert(e)
      })
    }
    else
      alert("length of password must be greater than 6")  
  }
  else
  {
    alert("password and confirm password must be same")
  }

  }
  
  forgetPassword(email:string)
  {
    this.firebaseAuth.sendPasswordResetEmail(email).then(()=>{
      alert('verificatoin email has been sent to your email')
        this.router.navigateByUrl('')
       }
   ).catch(err=>{
     alert(err)
   })



  
  }
  logout()
  {
  //  localStorage.removeItem('user');
    console.log(  "After log out",  localStorage.removeItem('user'))
    this.firebaseAuth.signOut();

    this.isLoggedIn=false;
  }
  async createNewPhoneNumber(Record){

   this.getUser()
    console.log(Record)
    Record.id=this.fireStore.createId();
    console.log(Record)
    
    return (await this.fireStore.collection("Users").doc(this.user).collection("PhoneNumber").add(Record))
    }


  fetchPhoneNumbers(){
   this.getUser()
    console.log("fetching",this.user)
    return this.fireStore.collection("Users").doc("cbUJ3GcXvQYNNXlZlqBBIDGwpWJ2").collection("PhoneNumber").snapshotChanges()

  }

  editItemFireStore( Record)
  {
    console.log("Update", Record)
 
    this.fireStore.collection("Users").doc(this.user).collection("PhoneNumber").doc(Record.id).update(Record)
  }

  deleteItem(item)
  {
    console.log(item)
    console.log("item deleted succesfully")
    return this.fireStore.collection("Users").doc(this.user).collection("PhoneNumber").doc(item).delete()
    }






  // getOneServe(id)
  // {
  //   console.log()
  //    return this.fireStore.collection("Users").doc(this.user).collection("PhoneNumber").doc(id).\
  //   // return {...this.phoneNum.find(contact=>{
  //   //   return  id===contact.id
  //   // })}
  // }
}
