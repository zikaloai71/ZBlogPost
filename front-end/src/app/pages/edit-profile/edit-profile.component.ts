import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"],
})
export class EditProfileComponent implements OnInit {
  userId: any;
  userData = {
    name: "",
    age: 0,
  };

  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.userId = this.activated.snapshot.paramMap.get("id");
    this.auth.authMe().subscribe((res) => {
      this.userData.name = res.name;
      this.userData.age = res.age;
    });
  }

  ngOnInit(): void {}

  handleEdit(editForm: NgForm) {
    if (editForm.valid) {
      this.auth.editProfile(this.userData).subscribe((res) => {
        if (res.apiStatus) {
          this.toastr.success("profile edited successfully");
          this.router.navigateByUrl(`/user/profile/${this.userId}`);
        }
      });
    }
  }
}
