import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  user:any
  userId:any
  
  constructor(public auth :AuthService , private global : GlobalService) { 
    let token = localStorage.getItem('token')
    if(token){ 
      this.auth.loginFlag=true
      this.auth.authMe().subscribe(data=>{
        this.user=data
        this.userId=data._id;
        
      })
    }
   }

  ngOnInit(): void {
  
  }

  handleLogOut(){
   
    this.auth.loginFlag=false
    this.auth.logOut().subscribe()
    localStorage.removeItem('token')
  }


 
 


}
