import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserLogIn } from 'src/app/interfaces/user-log-in';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  
  userData:UserLogIn={
    email:"",
    password:'',
  }
  errorMsg : string = ''
  user:any
  constructor(private auth : AuthService , private toastr : ToastrService, private router:Router ) {
   
   }

  ngOnInit(): void {
  }

  handleLogIn(logIn:NgForm){
    if(logIn.valid){
      this.auth.logIn(this.userData).subscribe(res=>{
         if(res.apiStatus){
          localStorage.setItem('token',res.data.token)
         
          this.toastr.success(`welcome ${res.data.userData.name}`)
          this.router.navigateByUrl('')
          this.auth.loginFlag=true;
         }
      },(err)=>{
       this.errorMsg=err.error.message
      })
     }
      
    }

}
