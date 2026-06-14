import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';

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
export class ScheduleSetupComponent {
  preferredStudyTime: string = 'afternoon';
  
  days = [
    { name: 'Monday', selected: false },
    { name: 'Tuesday', selected: false },
    { name: 'Wednesday', selected: false },
    { name: 'Thursday', selected: false },
    { name: 'Friday', selected: false },
    { name: 'Saturday', selected: false },
    { name: 'Sunday', selected: false }
  ];

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private api: ApiService, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const daysToAvoid = this.days
      .filter(d => d.selected)
      .map(d => d.name);

    this.api.saveSchedulePreferences(this.preferredStudyTime, daysToAvoid).subscribe({
      next: (res) => {
        this.isLoading = false;
        // Set configuration state in local storage
        localStorage.setItem('isScheduleConfigured', 'true');
        // Route back to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to save preferences: ' + (err.message || err);
        console.error('Schedule preferences save error:', err);
      }
    });
  }
}
