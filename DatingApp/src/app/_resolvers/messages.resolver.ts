import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Message } from '../_models/Message';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';
    constructor(private userService: UserService, private authService: AuthService,
                private router: Router, private alertify: AlertifyService) {}

    // Using Resolver to get data before loading the specific route
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber,
            this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
