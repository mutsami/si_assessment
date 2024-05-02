import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { VerificationComponent } from './components/verification/verification.component'; 
import { SharedModule } from './shared/shared.module';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { TimeagoFormatter, TimeagoModule } from 'ngx-timeago'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    VerificationComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ReactiveFormsModule,
    SharedModule
  ],  
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
