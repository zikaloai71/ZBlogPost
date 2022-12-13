import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm = new FormGroup({
    title: new FormControl("" , [Validators.required ,Validators.minLength(5), Validators.maxLength(15)]  ), 

    snippet: new FormControl("" , [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),

    category: new FormControl("" , [Validators.required]),
    // content 20 till finish the app
    content: new FormControl("" , [Validators.required , Validators.minLength(20)])
  })

  isSubmit = false
  constructor(private auth : AuthService , private router : Router , private toastr : ToastrService) { }

  get postData(){return this.addPostForm.controls}

  ngOnInit(): void {
  }

 addPost(){

 this.isSubmit = true

 if(this.addPostForm.valid){
  this.auth.addPost(this.addPostForm.value).subscribe(res=>{
    if(res.apiStatus){
      this.toastr.success(`post added successfully`)
      this.router.navigateByUrl("")
      console.log(res)
    }
   
  })
 }
 
 }
}
