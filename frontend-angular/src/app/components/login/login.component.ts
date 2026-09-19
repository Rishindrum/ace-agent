import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  signInWithGoogle(): void {
    const loginUrl = new URL(`${environment.apiUrl}/api/v1/auth/google/login`);
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      loginUrl.searchParams.set('return_origin', window.location.origin);
    }
    window.location.href = loginUrl.toString();
  }
}
