import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorateRoutingModule } from './directorate-routing.module';
import { SearchComponent } from './search/search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MessagesComponent } from './messages/messages.component';
import { FormsModule } from '@angular/forms';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [SearchComponent, NotificationsComponent, MessagesComponent, AdminpageComponent, PostsComponent],
  imports: [CommonModule, DirectorateRoutingModule, FormsModule],
})
export class DirectorateModule {}
