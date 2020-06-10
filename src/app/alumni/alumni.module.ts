import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumniRoutingModule } from './alumni-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { NoticesComponent } from './notices/notices.component';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MessagesComponent } from './messages/messages.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    MembersComponent,
    NoticesComponent,
    EventsComponent,
    ProfileComponent,
    EditprofileComponent,
    MessagesComponent,
  ],
  imports: [CommonModule, AlumniRoutingModule, FormsModule],
})
export class AlumniModule {}
