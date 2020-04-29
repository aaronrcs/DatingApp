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
  photoUrl: string;
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
    // Subscribing to the BehaviorSubject to acquire a live update of a photoUrl
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);

  }

  updateUser() {
    this.userSerivce.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editFrom.reset(this.user);

    }, error => {
      this.alertify.error(error);
    });
  }

  // Function to set new main photo (without refreshing page)
  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
