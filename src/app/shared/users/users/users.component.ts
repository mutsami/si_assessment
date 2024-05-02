import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  loading: boolean = true;
  users: any;

  ngOnInit() { 
    
    this.auth.getUsers().subscribe(e=>{
      this.users = e
      this.loading = false
      console.log(e);
      
    })
  }

  constructor(protected auth:AuthService){
    
  }

}
