import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-schedule-setup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './schedule-setup.component.html',
  styleUrls: ['./schedule-setup.component.scss']
})
export class ScheduleSetupComponent implements OnInit {
  preferredStudyTimes = [
    { name: 'Morning', selected: false },
    { name: 'Afternoon', selected: false },
    { name: 'Evening', selected: false }
  ];
  
  weeklyCommitment: number = 5;

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private api: ApiService, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const selectedTimes = this.preferredStudyTimes
      .filter(t => t.selected)
      .map(t => t.name);

    if (selectedTimes.length === 0) {
      this.errorMessage = 'Please select at least one preferred study time.';
      this.isLoading = false;
      return;
    }

    if (!this.weeklyCommitment || this.weeklyCommitment <= 0) {
      this.errorMessage = 'Please enter a valid weekly commitment target.';
      this.isLoading = false;
      return;
    }

    this.api.saveUserConfig(selectedTimes, this.weeklyCommitment).subscribe({
      next: (res) => {
        this.isLoading = false;
        // Flip the local storage state to hide the banner
        localStorage.setItem('isScheduleConfigured', 'true');
        localStorage.setItem('is_schedule_configured', 'true');
        // Route back to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to save configuration: ' + (err.error || err.message || err);
        console.error('Schedule config save error:', err);
      }
    });
  }
}
