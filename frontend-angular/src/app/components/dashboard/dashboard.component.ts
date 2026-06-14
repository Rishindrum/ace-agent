import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UploadComponent } from '../upload/upload.component';
import { GraphVisualizerComponent } from '../graph-visualizer/graph-visualizer.component';
import { ChatInterfaceComponent } from '../chat-interface/chat-interface.component';
import { QuizInterfaceComponent } from '../quiz-interface/quiz-interface.component';
import { IngestComponent } from '../ingest/ingest.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    UploadComponent,
    GraphVisualizerComponent,
    ChatInterfaceComponent,
    QuizInterfaceComponent,
    IngestComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeTab: 'syllabus' | 'tutor' | 'quiz' = 'syllabus';
  
  calendarConnected: boolean = false;
  isScheduleConfigured: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // 1. Check local storage
    this.calendarConnected = localStorage.getItem('calendar_connected') === 'true';
    this.isScheduleConfigured = localStorage.getItem('isScheduleConfigured') === 'true';

    // 2. Check query params
    this.route.queryParams.subscribe(params => {
      if (params['calendar_connected'] === 'true') {
        this.calendarConnected = true;
        localStorage.setItem('calendar_connected', 'true');
        
        // Clean up the URL query params so they don't linger
        this.router.navigate([], {
          queryParams: { calendar_connected: null },
          queryParamsHandling: 'merge'
        });
      }
    });
  }

  selectTab(tab: 'syllabus' | 'tutor' | 'quiz'): void {
    this.activeTab = tab;
  }
}
