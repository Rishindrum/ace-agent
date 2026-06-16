import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { GraphVisualizerComponent } from '../graph-visualizer/graph-visualizer.component';
import { ChatInterfaceComponent } from '../chat-interface/chat-interface.component';
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
    IngestComponent,
    LessonInterfaceComponent,
    CramExamComponent
  ],
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeTab: 'study' | 'progress' | 'tutor' = 'study';
  
  calendarConnected: boolean = false;
  isScheduleConfigured: boolean = false;

  // Streak Settings Modal State
  isStreakSettingsModalOpen: boolean = false;
  streakSettingsStartDate: string = '';
  streakSettingsPace: number = 45;
  streakSettingsStreak: number = 0;
  streakSettingsDays = [
    { name: 'Sun', value: 0, selected: false },
    { name: 'Mon', value: 1, selected: false },
    { name: 'Tue', value: 2, selected: false },
    { name: 'Wed', value: 3, selected: false },
    { name: 'Thu', value: 4, selected: false },
    { name: 'Fri', value: 5, selected: false },
    { name: 'Sat', value: 6, selected: false }
  ];

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

  // Edit Syllabus Modal Flow
  isEditSyllabusModalOpen: boolean = false;
  editingSyllabusWeeks: any[] = [];

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

  // Progress/Telemetry Data
  quizScores: any[] = [];

  trackByFn(index: any, item: any): any {
    return index;
  }

  mustStudyToday(classObj: any): boolean {
    if (!classObj || !classObj.preferred_days) return false;
    const today = new Date();
    const dayOfWeek = today.getDay();
    const isPreferredDay = classObj.preferred_days.includes(dayOfWeek);
    
    const todayStr = today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0');
    
    const alreadyStudiedToday = classObj.last_study_date === todayStr;
    return isPreferredDay && !alreadyStudiedToday;
  }

  getCourseCompletion(classObj: any): number {
    if (!classObj || !classObj.course_start_date) return 0;
    const currentWk = this.calculateCurrentWeek(classObj.course_start_date);
    const pct = Math.min(Math.round(((currentWk - 1) / 12) * 100), 100);
    return pct > 0 ? pct : 0;
  }

  getLearningMinutes(classObj: any): number {
    if (!classObj) return 0;
    const pace = classObj.daily_pace || 45;
    const streak = classObj.class_streak || classObj.current_streak || 0;
    let minutes = streak * pace;
    const todayStr = new Date().getFullYear() + '-' + 
      String(new Date().getMonth() + 1).padStart(2, '0') + '-' + 
      String(new Date().getDate()).padStart(2, '0');
    if (classObj.last_study_date === todayStr) {
      minutes += pace;
    }
    return minutes;
  }

  deleteClass(classId: string, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this class? This will permanently remove its syllabus, materials, schedule, and all generated lessons/quizzes.')) {
      this.api.deleteClass(classId).subscribe({
        next: () => {
          if (this.selectedClass && this.selectedClass.class_id === classId) {
            this.selectedClass = null;
          }
          this.loadClasses();
        },
        error: (err) => {
          alert('Failed to delete class: ' + (err.error?.message || err.message || err));
        }
      });
    }
  }

  openEditSyllabusModal(): void {
    if (!this.selectedClass) return;
    this.isEditSyllabusModalOpen = true;
    this.api.getSyllabus(this.selectedClass.class_id).subscribe({
      next: (res: any) => {
        const weeksFromApi = res?.weeks || [];
        this.editingSyllabusWeeks = [];
        for (let i = 1; i <= 12; i++) {
          const apiW = weeksFromApi.find((w: any) => w.week_number === i);
          this.editingSyllabusWeeks.push({
            week_number: i,
            topics: apiW ? [...apiW.topics] : []
          });
        }
      },
      error: (err) => {
        console.warn('Could not load syllabus from API, initializing default:', err);
        this.editingSyllabusWeeks = [];
        for (let i = 1; i <= 12; i++) {
          this.editingSyllabusWeeks.push({ week_number: i, topics: [] });
        }
      }
    });
  }

  closeEditSyllabusModal(): void {
    this.isEditSyllabusModalOpen = false;
  }

  addTopicToEditSyllabus(weekIdx: number): void {
    this.editingSyllabusWeeks[weekIdx].topics.push('');
  }

  removeTopicFromEditSyllabus(weekIdx: number, topicIdx: number): void {
    this.editingSyllabusWeeks[weekIdx].topics.splice(topicIdx, 1);
  }

  saveSyllabus(): void {
    if (!this.selectedClass) return;
    
    // Clean up topics: remove empty topic names
    const cleanedWeeks = this.editingSyllabusWeeks.map(w => ({
      week_number: w.week_number,
      topics: w.topics.map((t: string) => t.trim()).filter((t: string) => t !== '')
    }));

    this.api.editSyllabus(this.selectedClass.class_id, cleanedWeeks).subscribe({
      next: () => {
        this.isEditSyllabusModalOpen = false;
        this.loadTopicSufficiency(this.selectedClass.class_id, this.selectedTimelineWeek);
        this.loadAllTopicsSufficiency();
        alert('Syllabus updated successfully!');
      },
      error: (err) => {
        alert('Failed to save syllabus: ' + (err.error?.message || err.message || err));
      }
    });
  }

  loadQuizScores(): void {
    if (!this.selectedClass) return;
    const userId = this.authService.getUserID();
    if (!userId) return;
    this.api.getQuizScores(userId, this.selectedClass.class_id).subscribe({
      next: (res: any) => {
        this.quizScores = res.scores || [];
      },
      error: (err) => {
        console.warn('Could not load quiz scores:', err);
      }
    });
  }

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
    this.loadQuizScores();
    this.activeTab = 'study';
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
        this.activeTab = 'study';
      },
      error: (err) => {
        console.warn('Could not load daily session state on Study click:', err);
        this.activeTab = 'study';
      }
    });
  }

  toggleSyllabusWeek(week: number): void {
    this.selectedTimelineWeek = week;
    if (this.selectedClass) {
      this.loadTopicSufficiency(this.selectedClass.class_id, week);
    }
  }

  selectTab(tab: 'study' | 'progress' | 'tutor'): void {
    this.activeTab = tab;
    if (tab === 'progress') {
      this.loadQuizScores();
    }
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
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'txt' || ext === 'md') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.newMaterialText = e.target.result || '';
          this.newMaterialFile = null;
        };
        reader.readAsText(file);
      } else {
        this.newMaterialFile = file;
        this.newMaterialText = ''; // Clear text area since we are uploading a binary document
      }
    }
  }

  clearSelectedFile(): void {
    this.newMaterialFile = null;
    this.newMaterialText = '';
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

  openStreakSettingsModal(): void {
    if (!this.selectedClass) return;
    this.isStreakSettingsModalOpen = true;
    this.streakSettingsStartDate = this.selectedClass.course_start_date || new Date().toISOString().split('T')[0];
    this.streakSettingsPace = 45;
    this.streakSettingsStreak = this.selectedClass.class_streak || this.selectedClass.current_streak || 0;
    
    this.api.getUserScheduleSettings(this.selectedClass.class_id).subscribe({
      next: (sched) => {
        if (sched) {
          if (sched.course_start_date) this.streakSettingsStartDate = sched.course_start_date;
          if (sched.daily_pace) this.streakSettingsPace = sched.daily_pace;
          if (sched.current_streak) this.streakSettingsStreak = sched.current_streak;
          if (sched.preferred_days && Array.isArray(sched.preferred_days)) {
            this.streakSettingsDays.forEach(d => {
              d.selected = sched.preferred_days.includes(d.value);
            });
          }
        }
      },
      error: (err) => {
        console.warn('Could not load existing schedule settings for modal:', err);
      }
    });
  }

  closeStreakSettingsModal(): void {
    this.isStreakSettingsModalOpen = false;
  }

  saveStreakSettings(): void {
    const selectedDays = this.streakSettingsDays.filter(d => d.selected).map(d => d.value);
    if (selectedDays.length === 0) {
      alert('Please select at least one preferred study day.');
      return;
    }
    const classId = this.selectedClass ? this.selectedClass.class_id : 'default_class';
    const className = this.selectedClass ? this.selectedClass.class_name : 'Default Class';

    this.api.saveUserScheduleSettings(
      selectedDays,
      this.streakSettingsPace,
      this.streakSettingsStreak,
      this.streakSettingsStartDate,
      classId,
      className
    ).subscribe({
      next: (res) => {
        this.isStreakSettingsModalOpen = false;
        this.loadClasses();
        alert('Streak settings saved successfully!');
      },
      error: (err) => {
        alert('Failed to save settings: ' + (err.error?.message || err.message || err));
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

