import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from '../upload/upload.component';
import { GraphVisualizerComponent } from '../graph-visualizer/graph-visualizer.component';
import { ChatInterfaceComponent } from '../chat-interface/chat-interface.component';
import { QuizInterfaceComponent } from '../quiz-interface/quiz-interface.component';
import { IngestComponent } from '../ingest/ingest.component';
import { LessonInterfaceComponent } from '../lesson-interface/lesson-interface.component';
import { CramExamComponent } from '../cram-exam/cram-exam.component';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    FormsModule,
    UploadComponent,
    GraphVisualizerComponent,
    ChatInterfaceComponent,
    QuizInterfaceComponent,
    IngestComponent,
    LessonInterfaceComponent,
    CramExamComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeTab: 'syllabus' | 'lesson' | 'tutor' | 'quiz' = 'syllabus';
  
  calendarConnected: boolean = false;
  isScheduleConfigured: boolean = false;

  // Daily session gating state
  dailyState: any = { lesson_completed: false, exercises_completed: false, quiz_unlocked: false };
  todayDateString: string = '';

  // Timeline & Streaks
  currentWeek: number = 1;
  currentStreak: number = 0;
  weeks: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedTimelineWeek: number = 1;

  // Cram Mode UI State
  isCramModalOpen: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.todayDateString = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    this.loadDailyState();

    this.calendarConnected = localStorage.getItem('calendar_connected') === 'true';
    this.isScheduleConfigured = 
      localStorage.getItem('isScheduleConfigured') === 'true' || 
      localStorage.getItem('is_schedule_configured') === 'true';

    this.route.queryParams.subscribe(params => {
      if (params['calendar_connected'] === 'true') {
        this.calendarConnected = true;
        localStorage.setItem('calendar_connected', 'true');
        
        this.router.navigate([], {
          queryParams: { calendar_connected: null },
          queryParamsHandling: 'merge'
        });
      }
    });

    // Fetch user schedule settings to get start date and streak
    this.api.getUserScheduleSettings().subscribe({
      next: (sched) => {
        if (sched) {
          if (sched.course_start_date) {
            this.currentWeek = this.calculateCurrentWeek(sched.course_start_date);
          }
          this.currentStreak = sched.current_streak || 0;
        }
      },
      error: (err) => {
        console.warn('Could not load user schedule settings on dashboard:', err);
      }
    });
  }

  calculateCurrentWeek(startDateStr: string): number {
    if (!startDateStr) return 1;
    const startDate = new Date(startDateStr);
    const diffTime = Math.abs(new Date().getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const wk = Math.floor(diffDays / 7) + 1;
    return wk > 0 ? wk : 1;
  }

  selectTimelineWeek(week: number) {
    this.selectedTimelineWeek = week;
    this.api.getDailySessionState().subscribe({
      next: (state) => {
        if (state) {
          this.dailyState = state;
        }
        this.activeTab = 'lesson';
      },
      error: (err) => {
        console.warn('Could not load daily session state on Study click:', err);
        this.activeTab = 'lesson';
      }
    });
  }

  selectTab(tab: 'syllabus' | 'lesson' | 'tutor' | 'quiz'): void {
    this.activeTab = tab;
  }

  loadDailyState(): void {
    this.api.getDailySessionState().subscribe({
      next: (state) => {
        if (state) {
          this.dailyState = state;
        }
      },
      error: (err) => {
        console.warn('Could not load daily session state:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Cram Modal Actions
  openCramModal() {
    this.isCramModalOpen = true;
  }

  closeCramModal() {
    this.isCramModalOpen = false;
  }
}
