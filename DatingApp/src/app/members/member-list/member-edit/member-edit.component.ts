import { AuthService } from './../../../_services/auth.service';
import { AlertifyService } from './../../../_services/alertify.service';
import { User } from './../../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm', {static: true}) editFrom: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  // A Browser dialog box will appear if user tries to close browser without saving changes
  unloadNotification($event: any) {
    if (this.editFrom.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private authService: AuthService, private userSerivce: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
      // console.log('User Info: ', this.user);
    });
  }

  updateUser() {
    this.userSerivce.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editFrom.reset(this.user);

    }, error => {
      this.alertify.error(error);
    });
  }

}
