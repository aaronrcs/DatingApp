import { MemberEditComponent } from './../members/member-list/member-edit/member-edit.component';
import { Injectable, Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        // This guard is used to warn the user from losing unsaved changes when editing profile information
        // If user clicks 'no' on dialog box, the box will simply close
        if (component.editFrom.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost!');
        }
        return true;
    }
}