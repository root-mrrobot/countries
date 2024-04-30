import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  signOut() {
    const confirmed = window.confirm('Are you sure you want to sign out?');
    if (confirmed) {
      this.authService.logout();
      this.router.navigate(['/landing']);
    } 
  }
}
