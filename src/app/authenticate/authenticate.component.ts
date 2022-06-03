import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  constructor(private router: Router, private authService: FirebaseService) {}

  ngOnInit(): void {
    if(!this.authService.isLoggedIn)
    this.router.navigateByUrl('login')
  }

}
