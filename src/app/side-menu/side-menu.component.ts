import { Component, OnInit, Output } from "@angular/core";
import { FirebaseService } from "../services/firebase.service";
import { AdminGuard } from "../core/admin.guard";
import { BehaviorSubject, from, Observable } from "rxjs";
import { User } from "../models/user.model";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"],
})
export class SideMenuComponent implements OnInit {
  toolbarToggle: boolean = true;
  menuItems: any;
  displayName: string;
  permission = this.adminGuard.menuAuthenticated("student");
  isAdmin: boolean = false;
  isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user: User;

  constructor(
    public authService: FirebaseService,
    public adminGuard: AdminGuard
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if(user){
        this.displayName = user.displayName;
        this.setPermissions()
      }
    });

    this.authService.firebaseAuth.user.subscribe( user=> {
      if(user)
      this.toolbarToggle = true;
    })

  }

  toggleToolbar() {
    this.authService.menuStatus = !this.authService.menuStatus;
  }

  logout() {
    this.authService.logout();
  }

  hasAcces(roles) {
    return this.authService.checkAuthorization(this.user, roles);
  }

  ngOnInit(): void {
    this.menuItems = [
      {
        name: "Acasă",
        route: "acasa",
        role: ["student"],
        icon: "home"
      },
      {
        name: "Cerere nouă",
        route: "templates",
        role: ["student"],
        icon: ["note_alt"]
      },
      {
        name: "Istoric cereri",
        route: "istoric",
        role: ["student"],
        icon: ["reorder"]
      },
      {
        name: "Crează șablon",
        route: "form-builder",
        role: ["secretariat"],
        class: "restricted",
        icon: "admin_panel_settings"
      },
      {
        name: "Șabloane",
        route: "templates",
        role: ["secretariat"],
        class: "restricted",
        icon: "admin_panel_settings"
      },
      {
        name: "Depuneri",
        route: "submissions",
        role: ["secretariat"],
        class: "restricted",
        icon: "admin_panel_settings"
      },
    ];

  }

  setPermissions() {
    for (let menuItem of this.menuItems) {
      menuItem.hasAcces = this.hasAcces(menuItem.role)
    }
  }
}
