import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm = new FormGroup({
    oldPass: new FormControl("" , [Validators.required]  ), 
    password: new FormControl("" , [Validators.required]),

  })
  isSubmit = false
  userId:any
  constructor(private auth:AuthService , private toastr :ToastrService , private router :Router , private activated:ActivatedRoute) {
    
    this.userId= activated.snapshot.paramMap.get('id')

   }

  ngOnInit(): void {
  }
  get postData(){return this.changePasswordForm.controls}
  

 changePassword(){
  this.isSubmit = true

  if(this.changePasswordForm.valid){
   this.auth.changePassword(this.changePasswordForm.value).subscribe(res=>{
     if(res.apiStatus){
       this.toastr.success(`password updated successfully`)
       this.router.navigateByUrl(`/user/profile/${this.userId}`)
     }
   },(err)=>{
    this.toastr.warning(`your old password was entered wrong`)
   })
  }
 }
}
