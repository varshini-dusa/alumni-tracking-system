import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumniRoutingModule } from './alumni-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MessagesComponent } from './messages/messages.component';
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostsComponent } from './posts/posts.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { EduDetailsComponent } from './edu-details/edu-details.component';
import { WorkDetailsComponent } from './work-details/work-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    EditprofileComponent,
    MessagesComponent,
    NotificationsComponent,
    PostsComponent,
    BasicDetailsComponent,
    ContactDetailsComponent,
    EduDetailsComponent,
    WorkDetailsComponent,
  ],
  imports: [CommonModule, AlumniRoutingModule, FormsModule],
})
export class AlumniModule {}
