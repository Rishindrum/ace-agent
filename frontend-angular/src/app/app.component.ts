import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './components/upload/upload.component';
import { GraphVisualizerComponent } from './components/graph-visualizer/graph-visualizer.component';
import { ChatInterfaceComponent } from './components/chat-interface/chat-interface.component';
import { QuizInterfaceComponent } from './components/quiz-interface/quiz-interface.component';
import { MatIconModule } from '@angular/material/icon';
import { IngestComponent } from './components/ingest/ingest.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    UploadComponent, 
    GraphVisualizerComponent, 
    ChatInterfaceComponent,
    QuizInterfaceComponent,
    MatIconModule,
    IngestComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ace Agent';
  activeTab: 'syllabus' | 'tutor' | 'quiz' = 'syllabus';

  selectTab(tab: 'syllabus' | 'tutor' | 'quiz'): void {
    this.activeTab = tab;
  }
}