import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  user!:User;
constructor(protected auth:AuthService){
  this.auth.user$.subscribe(e=>{
    this.user = e
    console.log('verify',e);
    
  })
}
}
