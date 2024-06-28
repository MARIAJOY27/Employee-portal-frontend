import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logged:boolean = false

  constructor(private api:ApiService, private router:Router){
    api.shareData.subscribe((data)=>{
      this.logged = data
    })
  }
  

  logout(){
    this.logged=false
    this.router.navigateByUrl('/')
  }

}
