import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) {}

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/countries']);
    } else {
      // this.toastr.error('Invalid username or password', '');
      this.errorMessage = 'Invalid username or password';
    }
  }
}
