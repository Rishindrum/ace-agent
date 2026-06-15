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
  preferredDays = [
    { name: 'Sunday', value: 0, selected: false },
    { name: 'Monday', value: 1, selected: false },
    { name: 'Tuesday', value: 2, selected: false },
    { name: 'Wednesday', value: 3, selected: false },
    { name: 'Thursday', value: 4, selected: false },
    { name: 'Friday', value: 5, selected: false },
    { name: 'Saturday', value: 6, selected: false }
  ];
  
  dailyPace: number = 45;
  courseStartDate: string = '';
  currentStreak: number = 0;

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
      return;
    }

    const today = new Date();
    this.courseStartDate = today.toISOString().split('T')[0];

    this.isLoading = true;
    this.api.getUserScheduleSettings().subscribe({
      next: (sched) => {
        this.isLoading = false;
        if (sched) {
          if (sched.course_start_date) {
            this.courseStartDate = sched.course_start_date;
          }
          if (sched.daily_pace) {
            this.dailyPace = sched.daily_pace;
          }
          if (sched.current_streak) {
            this.currentStreak = sched.current_streak;
          }
          if (sched.preferred_days && Array.isArray(sched.preferred_days)) {
            this.preferredDays.forEach(d => {
              d.selected = sched.preferred_days.includes(d.value);
            });
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.warn('Could not load existing schedule settings:', err);
      }
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const selectedDays = this.preferredDays
      .filter(d => d.selected)
      .map(d => d.value);

    if (selectedDays.length === 0) {
      this.errorMessage = 'Please select at least one preferred study day.';
      this.isLoading = false;
      return;
    }

    if (!this.dailyPace || this.dailyPace <= 0) {
      this.errorMessage = 'Please enter a valid daily pace (minutes).';
      this.isLoading = false;
      return;
    }

    if (!this.courseStartDate) {
      this.errorMessage = 'Please select a valid course start date.';
      this.isLoading = false;
      return;
    }

    this.api.saveUserScheduleSettings(selectedDays, this.dailyPace, this.currentStreak, this.courseStartDate).subscribe({
      next: (res) => {
        this.isLoading = false;
        localStorage.setItem('isScheduleConfigured', 'true');
        localStorage.setItem('is_schedule_configured', 'true');
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
