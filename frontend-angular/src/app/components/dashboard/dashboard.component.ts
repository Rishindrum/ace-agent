import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { GraphVisualizerComponent } from '../graph-visualizer/graph-visualizer.component';
import { ChatInterfaceComponent } from '../chat-interface/chat-interface.component';
import { QuizInterfaceComponent } from '../quiz-interface/quiz-interface.component';
import { IngestComponent } from '../ingest/ingest.component';
import { LessonInterfaceComponent } from '../lesson-interface/lesson-interface.component';
import { CramExamComponent } from '../cram-exam/cram-exam.component';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { IngestService } from '../../services/ingest.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,
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

  // Multi-Class Management
  classes: any[] = [];
  selectedClass: any = null;
  globalStreak: number = 0;

  // Add Class Modal Flow
  isAddClassModalOpen: boolean = false;
  newClassName: string = '';
  newClassSyllabusFile: File | null = null;
  addClassErrorMessage: string = '';
  isAddingClass: boolean = false;

  // Topic Warnings & Materials
  allTopics: string[] = [];
  insufficientTopics: string[] = [];
  topicSufficiencyLoading: boolean = false;
  allWeeksData: { [key: number]: { topics: string[], insufficient: string[] } } = {};
  allWeeksLoading: boolean = false;
  addingMaterialTopic: string | null = null;
  newMaterialText: string = '';
  newMaterialFile: File | null = null;
  isIngestingMaterial: boolean = false;
  ingestMessage: string = '';
  ingestSuccess: boolean = false;

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
    private api: ApiService,
    private ingestService: IngestService
  ) {}


  ngOnInit(): void {
    const queryToken = this.route.snapshot.queryParams['token'];
    const queryUserId = this.route.snapshot.queryParams['user_id'];
    if (queryToken && queryUserId) {
      this.authService.setSession(queryToken, queryUserId);
    }

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.todayDateString = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    this.loadClasses();

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
  }

  loadClasses(): void {
    this.api.listClasses().subscribe({
      next: (res: any[]) => {
        this.classes = res || [];
        this.globalStreak = this.classes.reduce((max, c) => c.global_streak > max ? c.global_streak : max, 0);
        
        if (this.selectedClass) {
          const updated = this.classes.find(c => c.class_id === this.selectedClass.class_id);
          if (updated) {
            this.selectedClass = updated;
            this.currentStreak = updated.class_streak || updated.current_streak || 0;
            this.loadAllTopicsSufficiency();
          }
        }
      },
      error: (err) => {
        console.warn('Could not load enrolled classes:', err);
      }
    });
  }

  selectClass(classObj: any): void {
    this.selectedClass = classObj;
    if (!classObj) {
      this.allTopics = [];
      this.insufficientTopics = [];
      return;
    }

    // Set class-specific values
    this.currentStreak = classObj.class_streak || classObj.current_streak || 0;
    if (classObj.course_start_date) {
      this.currentWeek = this.calculateCurrentWeek(classObj.course_start_date);
    } else {
      this.currentWeek = 1;
    }
    
    this.selectedTimelineWeek = this.currentWeek;
    this.loadDailyState(classObj.class_id);
    this.loadTopicSufficiency(classObj.class_id, this.selectedTimelineWeek);
    this.loadAllTopicsSufficiency();
    this.activeTab = 'syllabus';
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
    if (!this.selectedClass) return;

    this.loadTopicSufficiency(this.selectedClass.class_id, week);
    this.api.getDailySessionState(this.selectedClass.class_id).subscribe({
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

  loadDailyState(classId?: string): void {
    const cid = classId || this.selectedClass?.class_id;
    if (!cid) return;

    this.api.getDailySessionState(cid).subscribe({
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

  loadTopicSufficiency(classId: string, weekNumber?: number): void {
    const week = weekNumber || this.selectedTimelineWeek;
    this.topicSufficiencyLoading = true;
    this.api.checkTopicSufficiency(classId, week).subscribe({
      next: (res: any) => {
        this.allTopics = res.all_topics || [];
        this.insufficientTopics = res.insufficient_topics || [];
        this.topicSufficiencyLoading = false;
      },
      error: (err) => {
        console.warn('Could not load topic sufficiency checks:', err);
        this.topicSufficiencyLoading = false;
      }
    });
  }

  loadAllTopicsSufficiency(): void {
    if (!this.selectedClass) return;
    this.allWeeksLoading = true;
    this.api.checkTopicSufficiency(this.selectedClass.class_id, 0).subscribe({
      next: (res: any) => {
        this.allWeeksLoading = false;
        const temp: { [key: number]: { topics: string[], insufficient: string[] } } = {};
        
        for (let i = 1; i <= 12; i++) {
          temp[i] = { topics: [], insufficient: [] };
        }
        
        const all = res.all_topics || [];
        const insufficient = res.insufficient_topics || [];
        
        all.forEach((item: string) => {
          const idx = item.indexOf(':');
          if (idx !== -1) {
            const wNum = parseInt(item.substring(0, idx), 10);
            const topic = item.substring(idx + 1);
            if (!isNaN(wNum)) {
              if (!temp[wNum]) {
                temp[wNum] = { topics: [], insufficient: [] };
              }
              temp[wNum].topics.push(topic);
            }
          }
        });
        
        insufficient.forEach((item: string) => {
          const idx = item.indexOf(':');
          if (idx !== -1) {
            const wNum = parseInt(item.substring(0, idx), 10);
            const topic = item.substring(idx + 1);
            if (!isNaN(wNum) && temp[wNum]) {
              temp[wNum].insufficient.push(topic);
            }
          }
        });
        
        this.allWeeksData = temp;
      },
      error: (err) => {
        console.warn('Could not load all topics sufficiency:', err);
        this.allWeeksLoading = false;
      }
    });
  }

  // Add Class Actions
  openAddClassModal(): void {
    this.newClassName = '';
    this.newClassSyllabusFile = null;
    this.addClassErrorMessage = '';
    this.isAddingClass = false;
    this.isAddClassModalOpen = true;
  }

  closeAddClassModal(): void {
    this.isAddClassModalOpen = false;
  }

  onAddClassFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.newClassSyllabusFile = event.target.files[0];
    }
  }

  createClass(): void {
    if (!this.newClassName.trim() || !this.newClassSyllabusFile) {
      this.addClassErrorMessage = 'Class Name and Syllabus PDF are required.';
      return;
    }

    this.isAddingClass = true;
    this.addClassErrorMessage = '';
    const classId = 'class_' + new Date().getTime();

    // 1. Upload Syllabus first
    this.api.uploadSyllabus(this.newClassSyllabusFile, classId, this.newClassName).subscribe({
      next: (uploadRes: any) => {
        if (!uploadRes || uploadRes.status === 'error') {
          this.isAddingClass = false;
          this.addClassErrorMessage = uploadRes?.message || 'Failed to upload syllabus PDF.';
          return;
        }

        // 2. Initialize default schedule settings for this class to create the record
        const today = new Date().toISOString().split('T')[0];
        this.api.saveUserScheduleSettings([2, 4], 1, 0, today, classId, this.newClassName).subscribe({
          next: (schedRes: any) => {
            this.isAddingClass = false;
            this.isAddClassModalOpen = false;
            this.loadClasses(); // Refresh grid
            
            // Auto-select the newly created class
            const newClass = {
              class_id: classId,
              class_name: this.newClassName,
              class_streak: 0,
              current_streak: 0,
              global_streak: this.globalStreak,
              course_start_date: today
            };
            this.selectClass(newClass);
          },
          error: (schedErr) => {
            this.isAddingClass = false;
            this.addClassErrorMessage = 'Syllabus uploaded, but failed to create class schedule: ' + (schedErr.error?.message || schedErr.message || schedErr);
          }
        });
      },
      error: (uploadErr) => {
        this.isAddingClass = false;
        this.addClassErrorMessage = 'Syllabus upload failed: ' + (uploadErr.error?.message || uploadErr.message || uploadErr);
      }
    });
  }

  // Ingest Materials Actions
  openAddMaterials(topic: string): void {
    this.addingMaterialTopic = topic;
    this.newMaterialText = '';
    this.newMaterialFile = null;
    this.ingestMessage = '';
    this.isIngestingMaterial = false;
    this.ingestSuccess = false;
  }

  closeAddMaterials(): void {
    this.addingMaterialTopic = null;
  }

  onMaterialFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newMaterialFile = file;
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'txt') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.newMaterialText = e.target.result || '';
        };
        reader.readAsText(file);
      } else {
        this.newMaterialText = `[File Upload: ${file.name}]`;
      }
    }
  }

  submitMaterials(): void {
    if ((!this.newMaterialText.trim() && !this.newMaterialFile) || !this.addingMaterialTopic || !this.selectedClass) {
      this.ingestMessage = 'Please enter raw text or select a valid file.';
      this.ingestSuccess = false;
      return;
    }

    this.isIngestingMaterial = true;
    this.ingestMessage = 'Uploading and ingesting study materials...';

    this.ingestService.ingestMaterial(
      this.selectedTimelineWeek,
      this.addingMaterialTopic,
      this.newMaterialText,
      this.selectedClass.class_id,
      this.newMaterialFile
    ).subscribe({
      next: (res: any) => {
        this.isIngestingMaterial = false;
        this.ingestSuccess = true;
        this.ingestMessage = 'Material successfully ingested!';
        this.loadTopicSufficiency(this.selectedClass.class_id, this.selectedTimelineWeek);
        this.loadAllTopicsSufficiency();
        setTimeout(() => {
          this.closeAddMaterials();
        }, 1500);
      },
      error: (err) => {
        this.isIngestingMaterial = false;
        this.ingestSuccess = false;
        this.ingestMessage = 'Ingestion failed: ' + (err.error?.message || err.message || err);
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

