import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users/users.component';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { TimeagoModule, TimeagoPipe } from 'ngx-timeago';
import { SideNavComponent } from './side-nav/side-nav/side-nav.component';
import { FooterComponent } from './footer/footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component';
import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [
    UsersComponent,
  DateAgoPipe,
  SideNavComponent,
  FooterComponent,
  NavBarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    UsersComponent,
    DateAgoPipe,
    TimeagoModule,
    SideNavComponent,
    FooterComponent,
    NavBarComponent
  ]
})
export class SharedModule { }
