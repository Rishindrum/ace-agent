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
    LessonInterfaceComponent
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

  // Cram Mode UI
  isCramModalOpen: boolean = false;
  cramStartWeek: number = 1;
  cramEndWeek: number = 4;
  isCramLoading: boolean = false;
  cramData: any = null;
  cramError: string = '';
  currentCramQuestionIndex: number = 0;
  selectedCramOptionIndex: number | null = null;
  cramCorrectAnswersCount: number = 0;
  showCramExplanation: boolean = false;
  cramFinished: boolean = false;

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
    this.activeTab = 'lesson';
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
    this.cramData = null;
    this.cramError = '';
    this.cramFinished = false;
  }

  closeCramModal() {
    this.isCramModalOpen = false;
  }

  startCramSession() {
    if (this.cramStartWeek > this.cramEndWeek) {
      this.cramError = 'Start week must be less than or equal to end week.';
      return;
    }
    this.isCramLoading = true;
    this.cramError = '';
    this.cramData = null;

    this.api.generateCramSession(this.cramStartWeek, this.cramEndWeek).subscribe({
      next: (res) => {
        this.isCramLoading = false;
        if (res && res.dense_review_markdown) {
          this.cramData = res;
          this.currentCramQuestionIndex = 0;
          this.selectedCramOptionIndex = null;
          this.cramCorrectAnswersCount = 0;
          this.showCramExplanation = false;
          this.cramFinished = false;
        } else {
          this.cramError = 'Failed to generate cram session guide.';
        }
      },
      error: (err) => {
        this.isCramLoading = false;
        this.cramError = 'Error generating cram session: ' + (err.error?.message || err.message || err);
      }
    });
  }

  selectCramOption(idx: number) {
    if (this.selectedCramOptionIndex !== null) return;
    this.selectedCramOptionIndex = idx;
    this.showCramExplanation = true;
    const currentQ = this.cramData.rapid_fire_quiz[this.currentCramQuestionIndex];
    if (idx === currentQ.correct_option_index) {
      this.cramCorrectAnswersCount++;
    }
  }

  nextCramQuestion() {
    this.selectedCramOptionIndex = null;
    this.showCramExplanation = false;
    if (this.currentCramQuestionIndex < this.cramData.rapid_fire_quiz.length - 1) {
      this.currentCramQuestionIndex++;
    } else {
      this.cramFinished = true;
    }
  }

  renderMarkdown(md: string): string {
    if (!md) return '';
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^\s*\-\s*(.*$)/gim, '<li>$1</li>')
      .replace(/\n/g, '<br/>');
    return html;
  }
}
