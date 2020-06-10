import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { EventsComponent } from './events/events.component';
import { MembersComponent } from './members/members.component';
import { NoticesComponent } from './notices/notices.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: 'dashboard/:username',
    component: DashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'editprofile', component: EditprofileComponent },
      { path: 'events', component: EventsComponent },
      { path: 'members', component: MembersComponent },
      { path: 'notices', component: NoticesComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumniRoutingModule {}
