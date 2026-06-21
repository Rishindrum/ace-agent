import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { GraphVisualizerComponent } from '../graph-visualizer/graph-visualizer.component';
import { ChatInterfaceComponent } from '../chat-interface/chat-interface.component';
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
    LessonInterfaceComponent,
    CramExamComponent
  ],
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeTab: 'study' | 'progress' | 'tutor' | 'materials' | 'settings' = 'study';
  studySubTab: 'lesson' | 'syllabus_graph' = 'lesson';

  // Materials and Settings state
  materials: any[] = [];
  selectedMaterial: any = null;
  isLoadingMaterials: boolean = false;

  settingsCalendarEnabled: boolean = false;
  settingsCalendarNotifs: boolean = false;
  settingsDefaultQuizLen: number = 10;
  settingsStartDate: string = '';
  settingsPace: number = 45;
  settingsStreak: number = 0;
  settingsDays = [
    { name: 'Sun', value: 0, selected: false },
    { name: 'Mon', value: 1, selected: false },
    { name: 'Tue', value: 2, selected: false },
    { name: 'Wed', value: 3, selected: false },
    { name: 'Thu', value: 4, selected: false },
    { name: 'Fri', value: 5, selected: false },
    { name: 'Sat', value: 6, selected: false }
  ];
  
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

  // Post-upload Setup State
  addClassStep: number = 1;
  setupClassId: string = '';
  setupClassName: string = '';
  setupRecommendedPace: number = 45;
  setupRecommendedDays: number[] = [];
  setupTopicsList: any[] = [];

  // Tutorial State
  isTutorialActive: boolean = false;
  tutorialStep: number = 1;

  // Animation Overlays State
  showAnimationOverlay: boolean = false;
  animationType: 'streak' | 'milestone' | 'course_complete' = 'streak';
  animStreakCount: number = 0;
  animMilestoneName: string = '';
  animCompletionPercentage: number = 0;

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
  classCompletions: { [key: string]: number } = {};

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
    if (!classObj) return 0;

    // If it is the currently selected class, calculate it reactively and cache the result
    if (this.selectedClass && classObj.class_id === this.selectedClass.class_id) {
      const weekNumbers = Object.keys(this.allWeeksData).map(k => parseInt(k, 10));
      if (weekNumbers.length > 0) {
        let completedWeeksCount = 0;
        for (const weekNum of weekNumbers) {
          const weekTopics = this.allWeeksData[weekNum]?.topics || [];
          if (weekTopics.length === 0) continue;
          
          const hasCompletedQuizForWeek = this.quizScores.some(score => 
            score.topic_name === `Week ${weekNum} Quiz` || weekTopics.includes(score.topic_name)
          );
          if (hasCompletedQuizForWeek) {
            completedWeeksCount++;
          }
        }
        const totalWeeks = weekNumbers.length;
        const pct = Math.round((completedWeeksCount / totalWeeks) * 100);
        this.classCompletions[classObj.class_id] = pct;
        return pct;
      }
    }

    // Return cached completion value if it exists
    if (this.classCompletions[classObj.class_id] !== undefined) {
      return this.classCompletions[classObj.class_id];
    }

    // Fallback: Time elapsed based calculation
    if (!classObj.course_start_date) return 0;
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
        this.loadSyllabusGraph(this.selectedClass.class_id);
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
            this.loadSyllabusGraph(updated.class_id);
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
    this.loadSyllabusGraph(classObj.class_id);
    this.activeTab = 'study';
  }

  loadSyllabusGraph(classId: string): void {
    this.api.getSyllabus(classId).subscribe({
      next: (res: any) => {
        if (res && res.graph_json) {
          try {
            const graphData = JSON.parse(res.graph_json);
            this.api.updateGraphData(graphData);
          } catch (e) {
            console.error('Failed to parse graph_json:', e);
            this.api.updateGraphData([]);
          }
        } else {
          this.api.updateGraphData([]);
        }
      },
      error: (err) => {
        console.warn('Could not load syllabus graph:', err);
        this.api.updateGraphData([]);
      }
    });
  }

  viewSyllabusDirect(): void {
    if (!this.selectedClass) return;
    this.activeTab = 'materials';
    this.isLoadingMaterials = true;
    this.api.getMaterials(this.selectedClass.class_id).subscribe({
      next: (res) => {
        this.isLoadingMaterials = false;
        if (res && res.materials) {
          this.materials = res.materials;
          const syllabusMat = this.materials.find((m: any) => m.filename.toLowerCase().includes('syllabus') || m.material_id.startsWith('syllabus_'));
          if (syllabusMat) {
            this.selectedMaterial = syllabusMat;
          } else {
            this.selectedMaterial = null;
          }
        } else {
          this.materials = [];
          this.selectedMaterial = null;
        }
      },
      error: (err) => {
        this.isLoadingMaterials = false;
        console.error('Failed to load materials:', err);
      }
    });
  }

  calculateCurrentWeek(startDateStr: string): number {
    if (!startDateStr) return 1;
    const startDate = new Date(startDateStr);
    const diffTime = Math.abs(new Date().getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let wk = Math.floor(diffDays / 7) + 1;
    if (wk < 1) wk = 1;
    if (wk > 12) wk = 12;
    return wk;
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

  selectTab(tab: 'study' | 'progress' | 'tutor' | 'materials' | 'settings'): void {
    this.activeTab = tab;
    if (tab === 'progress') {
      this.loadQuizScores();
    } else if (tab === 'materials') {
      this.loadMaterials();
    } else if (tab === 'settings') {
      this.loadSettings();
    }
  }

  loadMaterials(): void {
    if (!this.selectedClass) return;
    this.isLoadingMaterials = true;
    this.api.getMaterials(this.selectedClass.class_id).subscribe({
      next: (res) => {
        this.isLoadingMaterials = false;
        if (res && res.materials) {
          this.materials = res.materials;
        } else {
          this.materials = [];
        }
      },
      error: (err) => {
        this.isLoadingMaterials = false;
        console.error('Failed to load materials:', err);
      }
    });
  }

  deleteMaterial(materialId: string): void {
    if (!this.selectedClass) return;
    if (!confirm('Are you sure you want to delete this study material? This will rebuild the knowledge base index.')) return;
    this.api.deleteMaterial(this.selectedClass.class_id, materialId).subscribe({
      next: (res) => {
        alert('Material deleted successfully!');
        if (this.selectedMaterial?.material_id === materialId) {
          this.selectedMaterial = null;
        }
        this.loadMaterials();
      },
      error: (err) => {
        alert('Failed to delete material: ' + (err.error?.message || err.message || err));
      }
    });
  }

  viewMaterial(material: any): void {
    this.selectedMaterial = material;
  }

  loadSettings(): void {
    if (!this.selectedClass) return;
    this.api.getUserScheduleSettings(this.selectedClass.class_id).subscribe({
      next: (sched) => {
        if (sched) {
          this.settingsCalendarEnabled = sched.calendar_enabled || false;
          this.settingsCalendarNotifs = sched.calendar_notifs || false;
          this.settingsDefaultQuizLen = sched.default_quiz_len || 10;
          this.settingsStartDate = sched.course_start_date || '';
          this.settingsPace = sched.daily_pace || 45;
          this.settingsStreak = sched.current_streak || 0;
          if (sched.preferred_days && Array.isArray(sched.preferred_days)) {
            this.settingsDays.forEach(d => {
              d.selected = sched.preferred_days.includes(d.value);
            });
          }
        }
      },
      error: (err) => {
        console.error('Failed to load settings:', err);
      }
    });
  }

  saveSettings(): void {
    const selectedDays = this.settingsDays.filter(d => d.selected).map(d => d.value);
    if (selectedDays.length === 0) {
      alert('Please select at least one preferred study day.');
      return;
    }
    if (this.settingsCalendarEnabled && !this.calendarConnected) {
      if (confirm('Please authorize Google Calendar access first so Ace Agent can sync your schedule. Redirect to Google authorization?')) {
        this.enableCalendarInTutorial();
      }
      return;
    }
    const classId = this.selectedClass?.class_id || 'default_class';
    const className = this.selectedClass?.class_name || 'Default Class';

    this.api.saveUserScheduleSettings(
      selectedDays,
      this.settingsPace,
      this.settingsStreak,
      this.settingsStartDate,
      classId,
      className,
      this.settingsCalendarEnabled,
      this.settingsCalendarNotifs,
      this.settingsDefaultQuizLen
    ).subscribe({
      next: (res) => {
        alert('Settings saved successfully!');
        this.loadClasses();
      },
      error: (err) => {
        alert('Failed to save settings: ' + (err.error?.message || err.message || err));
      }
    });
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
    this.addClassStep = 1;
    this.setupTopicsList = [];
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
        this.isAddingClass = false;
        if (!uploadRes || uploadRes.status === 'error') {
          this.addClassErrorMessage = uploadRes?.message || 'Failed to upload syllabus PDF.';
          return;
        }

        // Capture recommendations and transition to Step 2
        this.addClassStep = 2;
        this.setupClassId = classId;
        this.setupClassName = this.newClassName;
        this.setupRecommendedPace = uploadRes.recommended_daily_pace_minutes || 45;
        this.setupRecommendedDays = uploadRes.recommended_study_days || [1, 3, 5];

        // Populate streakSettings / settingsDays checked arrays
        this.streakSettingsPace = this.setupRecommendedPace;
        this.streakSettingsStartDate = new Date().toISOString().split('T')[0];
        this.streakSettingsDays.forEach(d => {
          d.selected = this.setupRecommendedDays.includes(d.value);
        });

        // Load topics from syllabus
        this.api.getSyllabus(classId).subscribe({
          next: (res: any) => {
            this.setupTopicsList = res.weeks || [];
          },
          error: (err) => {
            console.warn('Failed to load syllabus for post-upload preview:', err);
          }
        });
      },
      error: (uploadErr) => {
        this.isAddingClass = false;
        this.addClassErrorMessage = 'Syllabus upload failed: ' + (uploadErr.error?.message || uploadErr.message || uploadErr);
      }
    });
  }

  addTopicToSetupSyllabus(weekIdx: number): void {
    if (this.setupTopicsList[weekIdx]) {
      this.setupTopicsList[weekIdx].topics.push('');
    }
  }

  removeTopicFromSetupSyllabus(weekIdx: number, topicIdx: number): void {
    if (this.setupTopicsList[weekIdx]) {
      this.setupTopicsList[weekIdx].topics.splice(topicIdx, 1);
    }
  }

  addWeekToSetupSyllabus(): void {
    const nextWeekNum = this.setupTopicsList.length + 1;
    this.setupTopicsList.push({
      week_number: nextWeekNum,
      topics: ['']
    });
  }

  removeWeekFromSetupSyllabus(weekIdx: number): void {
    this.setupTopicsList.splice(weekIdx, 1);
    // Re-index remaining weeks
    this.setupTopicsList.forEach((wk, idx) => {
      wk.week_number = idx + 1;
    });
  }

  saveSetupSettings(): void {
    const selectedDays = this.streakSettingsDays.filter(d => d.selected).map(d => d.value);
    if (selectedDays.length === 0) {
      alert('Please select at least one preferred study day.');
      return;
    }

    this.isAddingClass = true;
    this.addClassErrorMessage = '';

    // 1. Clean up topics: remove empty topic names
    const cleanedWeeks = this.setupTopicsList.map(w => ({
      week_number: w.week_number,
      topics: w.topics.map((t: string) => t.trim()).filter((t: string) => t !== '')
    }));

    // 2. Save the syllabus split first
    this.api.editSyllabus(this.setupClassId, cleanedWeeks).subscribe({
      next: () => {
        // 3. Save user schedule settings
        this.api.saveUserScheduleSettings(
          selectedDays,
          this.streakSettingsPace,
          0, // streak starts at 0
          this.streakSettingsStartDate,
          this.setupClassId,
          this.setupClassName
        ).subscribe({
          next: (schedRes: any) => {
            this.isAddingClass = false;
            this.isAddClassModalOpen = false;
            this.loadClasses(); // Refresh grid
            
            // Auto-select the newly created class
            const newClass = {
              class_id: this.setupClassId,
              class_name: this.setupClassName,
              class_streak: 0,
              current_streak: 0,
              global_streak: this.globalStreak,
              course_start_date: this.streakSettingsStartDate
            };
            this.selectClass(newClass);
            
            // Start interactive onboarding tour!
            this.startOnboardingTutorial();
          },
          error: (schedErr) => {
            this.isAddingClass = false;
            this.addClassErrorMessage = 'Failed to save schedule settings: ' + (schedErr.error?.message || schedErr.message || schedErr);
          }
        });
      },
      error: (err) => {
        this.isAddingClass = false;
        this.addClassErrorMessage = 'Failed to save syllabus: ' + (err.error?.message || err.message || err);
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

  submitMaterials(force: boolean = false): void {
    if ((!this.newMaterialText.trim() && !this.newMaterialFile) || !this.addingMaterialTopic || !this.selectedClass) {
      this.ingestMessage = 'Please enter raw text or select a valid file.';
      this.ingestSuccess = false;
      return;
    }

    this.isIngestingMaterial = true;
    this.ingestMessage = force ? 'Forcing ingestion of study materials...' : 'Uploading and ingesting study materials...';

    this.ingestService.ingestMaterial(
      this.selectedTimelineWeek,
      this.addingMaterialTopic,
      this.newMaterialText,
      this.selectedClass.class_id,
      this.newMaterialFile,
      force
    ).subscribe({
      next: (res: any) => {
        this.isIngestingMaterial = false;
        if (res && res.success === false) {
          const msg = res.message || 'Ingestion failed.';
          if (msg.includes('[WARNING_UNRELATED]')) {
            const cleanMsg = msg.replace('[WARNING_UNRELATED]', '').trim();
            const confirmed = confirm(cleanMsg + "\n\nDo you still want to upload this material under this topic?");
            if (confirmed) {
              this.submitMaterials(true);
            } else {
              this.ingestSuccess = false;
              this.ingestMessage = 'Ingestion cancelled by user.';
            }
          } else {
            this.ingestSuccess = false;
            this.ingestMessage = msg;
          }
          return;
        }

        this.ingestSuccess = true;
        this.ingestMessage = 'Material successfully ingested!';
        this.loadTopicSufficiency(this.selectedClass.class_id, this.selectedTimelineWeek);
        this.loadAllTopicsSufficiency();
        this.loadMaterials();
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

  onGeneralIngested(): void {
    if (!this.selectedClass) return;
    this.loadTopicSufficiency(this.selectedClass.class_id, this.selectedTimelineWeek);
    this.loadAllTopicsSufficiency();
    this.loadMaterials();
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

  // Onboarding Tutorial Methods
  startOnboardingTutorial(): void {
    this.isTutorialActive = true;
    this.tutorialStep = 1;
  }

  nextTutorialStep(): void {
    if (this.tutorialStep < 5) {
      this.tutorialStep++;
    } else {
      this.endTutorial();
    }
  }

  endTutorial(): void {
    this.isTutorialActive = false;
    this.tutorialStep = 1;
    if (this.selectedClass) {
      localStorage.setItem('onboarding_completed_' + this.selectedClass.class_id, 'true');
    }
  }

  enableCalendarInTutorial(): void {
    const token = this.authService.getToken();
    window.location.href = `${this.api.baseUrl}/api/v1/auth/google/login?token=${token}`;
  }

  // Reset Progress per week
  resetWeekProgress(weekNumber: number, event: Event): void {
    event.stopPropagation();
    if (!this.selectedClass) return;
    if (confirm(`Are you sure you want to reset all progress, BigQuery scores, and lessons/quizzes for Week ${weekNumber}? This cannot be undone.`)) {
      this.api.resetWeekProgress(this.selectedClass.class_id, weekNumber).subscribe({
        next: (res) => {
          alert(res.message || `Successfully reset Week ${weekNumber} progress!`);
          this.loadTopicSufficiency(this.selectedClass.class_id, this.selectedTimelineWeek);
          this.loadAllTopicsSufficiency();
          this.loadClasses();
          this.loadDailyState();
          this.loadQuizScores();
        },
        error: (err) => {
          alert('Failed to reset week progress: ' + (err.error?.message || err.message || err));
        }
      });
    }
  }

  // Quiz completed & streak animation triggers
  onQuizCompleted(event: any): void {
    if (!this.selectedClass) return;
    const cid = this.selectedClass.class_id;

    // Save current values to compare
    const prevStreak = this.selectedClass.class_streak || this.selectedClass.current_streak || 0;
    const prevCompletion = this.getCourseCompletion(this.selectedClass);

    // Update strengths immediately from event payload
    if (event && event.class_streak !== undefined) {
      this.selectedClass.class_streak = event.class_streak;
      this.selectedClass.current_streak = event.class_streak;
      this.currentStreak = event.class_streak;
    }
    if (event && event.global_streak !== undefined) {
      this.globalStreak = event.global_streak;
    }

    // Append score to quizScores array immediately in memory to bypass BigQuery streaming buffer delay
    if (event && event.score !== undefined) {
      const percentage = event.percentage !== undefined ? event.percentage : Math.round((event.score / event.total) * 100);
      const newRecord = {
        user_id: this.authService.getUserID() || 'default_user',
        class_id: cid,
        topic_name: `Week ${this.selectedTimelineWeek} Quiz`,
        score: percentage,
        timestamp: new Date().toISOString()
      };
      
      const existingIdx = this.quizScores.findIndex(q => q.topic_name === newRecord.topic_name);
      if (existingIdx !== -1) {
        this.quizScores[existingIdx] = newRecord;
      } else {
        this.quizScores = [newRecord, ...this.quizScores];
      }
    }

    const newStreak = event && event.class_streak !== undefined ? event.class_streak : prevStreak;
    const newCompletion = this.getCourseCompletion(this.selectedClass);

    // Trigger animation overlay immediately!
    this.triggerAnimations(prevStreak, newStreak, prevCompletion, newCompletion);

    // Refresh class details in background
    this.api.listClasses().subscribe({
      next: (res: any[]) => {
        this.classes = res || [];
        const updated = this.classes.find(c => c.class_id === cid);
        if (updated) {
          this.selectedClass = updated;
        }
        this.loadDailyState(cid);
        this.loadQuizScores();
      }
    });
  }

  triggerAnimations(prevStreak: number, newStreak: number, prevCompletion: number, newCompletion: number): void {
    // Check if course is 100% completed
    if (newCompletion === 100 && prevCompletion < 100) {
      this.animationType = 'course_complete';
      this.animCompletionPercentage = 100;
      this.animStreakCount = newStreak;
      this.showAnimationOverlay = true;
      this.triggerAudioGong();
      return;
    }

    // Check if new streak is a landmark milestone (50, 100, 200...)
    const landmarks = [50, 100, 200, 300, 400, 500];
    if (landmarks.includes(newStreak) && newStreak > prevStreak) {
      this.animationType = 'milestone';
      this.animStreakCount = newStreak;
      if (newStreak === 50) this.animMilestoneName = 'Supernova';
      else if (newStreak === 100) this.animMilestoneName = 'Cosmic Legend';
      else if (newStreak === 200) this.animMilestoneName = 'Interstellar Master';
      else this.animMilestoneName = 'Galaxy Voyager';
      this.showAnimationOverlay = true;
      this.triggerAudioGong();
      return;
    }

    // ONLY trigger the full-screen study overlay if the streak actually increased!
    if (newStreak > prevStreak) {
      this.animationType = 'streak';
      this.animStreakCount = newStreak;
      this.animCompletionPercentage = newCompletion;
      this.showAnimationOverlay = true;
      this.triggerAudioGong();
    } else {
      console.log('[Dashboard] Streak maintained (no increment). Skipping full-screen animation overlay.');
    }
  }

  closeAnimationOverlay(): void {
    this.showAnimationOverlay = false;
  }

  triggerAudioGong(): void {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // Octave jump
      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.5);
    } catch (e) {
      console.log('Audio Context not allowed or supported yet:', e);
    }
  }
}

