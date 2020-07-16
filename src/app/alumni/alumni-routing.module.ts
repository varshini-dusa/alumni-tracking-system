import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostsComponent } from './posts/posts.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { EduDetailsComponent } from './edu-details/edu-details.component';
import { WorkDetailsComponent } from './work-details/work-details.component';

const routes: Routes = [
  {
    path: 'dashboard/:username',
    component: DashboardComponent,
    children: [
      { path: '', component: PostsComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'editprofile',
        component: EditprofileComponent,
        children: [
          { path: 'basic-details', component: BasicDetailsComponent },
          { path: 'contact-details', component: ContactDetailsComponent },
          { path: 'edu-details', component: EduDetailsComponent },
          { path: 'work-details', component: WorkDetailsComponent },
        ],
      },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumniRoutingModule {}
