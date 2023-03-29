import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import {NgForm} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userData:User={
    name:'',
    age:18,
    email:"",
    password:""
  }
  constructor(private auth : AuthService , private router : Router) { }

  ngOnInit(): void {
  }

  handleSignUp(signUp:NgForm){
  
   if(signUp.valid){

    this.auth.signUp(this.userData).subscribe(res=>{
         this.router.navigateByUrl('user/login')      
    },(err)=>{
     console.log(err)
    })
   }
 

   }
  
}
