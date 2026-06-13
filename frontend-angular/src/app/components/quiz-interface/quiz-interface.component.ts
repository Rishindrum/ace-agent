import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from '../../services/api.service';

interface Question {
  question_text: string;
  options: string[];
  correct_option_index: number;
  topic: string;
  explanation: string;
}

interface Quiz {
  quiz_title: string;
  questions: Question[];
}

@Component({
  selector: 'app-quiz-interface',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './quiz-interface.component.html',
  styleUrls: ['./quiz-interface.component.scss']
})
export class QuizInterfaceComponent implements OnInit {
  Math = Math;
  userId: string = 'demo_student';
  syllabusName: string = '';
  currentView: 'history' | 'quiz' = 'history';
  
  // Quiz State
  quizHistory: any[] = [];
  currentQuiz: Quiz | null = null;
  currentQuestionIndex: number = 0;
  selectedOptionIndex: number | null = null;
  correctAnswersCount: number = 0;
  showExplanation: boolean = false;
  quizFinished: boolean = false;
  isLoading: boolean = false;
  statusMessage: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // Subscribe to active syllabus
    this.api.activeSyllabus.subscribe(name => {
      this.syllabusName = name;
    });

    // Load initial score history
    this.loadHistory();
  }

  loadHistory(): void {
    if (!this.userId.trim()) return;
    this.isLoading = true;
    this.api.getQuizScores(this.userId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res && res.scores) {
          this.quizHistory = res.scores;
        } else {
          this.quizHistory = [];
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error("Error loading scores:", err);
      }
    });
  }

  startQuiz(): void {
    if (!this.userId.trim() || !this.syllabusName.trim()) {
      this.statusMessage = 'Please upload a syllabus or enter a syllabus name first.';
      return;
    }
    
    this.isLoading = true;
    this.statusMessage = 'Generating adaptive quiz with Gemini...';
    
    this.api.generateAdaptiveQuiz(this.userId, this.syllabusName).subscribe({
      next: (quizData: any) => {
        this.isLoading = false;
        this.statusMessage = '';
        if (quizData && quizData.questions && quizData.questions.length > 0) {
          this.currentQuiz = quizData;
          this.currentQuestionIndex = 0;
          this.selectedOptionIndex = null;
          this.correctAnswersCount = 0;
          this.showExplanation = false;
          this.quizFinished = false;
          this.currentView = 'quiz';
        } else {
          this.statusMessage = 'Failed to generate a valid quiz. Please try again.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.statusMessage = 'Error generating quiz: ' + err.message;
        console.error("Quiz generation error:", err);
      }
    });
  }

  selectOption(idx: number): void {
    if (this.selectedOptionIndex !== null) return; // Already answered
    
    this.selectedOptionIndex = idx;
    this.showExplanation = true;
    
    if (this.currentQuiz && idx === this.currentQuiz.questions[this.currentQuestionIndex].correct_option_index) {
      this.correctAnswersCount++;
    }
  }

  nextQuestion(): void {
    if (!this.currentQuiz) return;
    
    this.selectedOptionIndex = null;
    this.showExplanation = false;
    
    if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz(): void {
    this.quizFinished = true;
    if (!this.currentQuiz) return;
    
    const totalQuestions = this.currentQuiz.questions.length;
    const finalScorePercent = Math.round((this.correctAnswersCount / totalQuestions) * 100);
    
    // For the topic_name, let's use the topic of the first question, or default to syllabus
    const primaryTopic = this.currentQuiz.questions[0]?.topic || this.syllabusName;
    
    this.isLoading = true;
    this.statusMessage = `Submitting score (${finalScorePercent}%) to BigQuery...`;
    
    this.api.submitQuizResult(this.userId, primaryTopic, finalScorePercent).subscribe({
      next: () => {
        this.isLoading = false;
        this.statusMessage = 'Score submitted successfully!';
        this.loadHistory(); // Reload dashboard history
      },
      error: (err) => {
        this.isLoading = false;
        this.statusMessage = 'Failed to submit score: ' + err.message;
        console.error("Score submission failed:", err);
        this.loadHistory(); // Reload history anyway
      }
    });
  }

  exitQuiz(): void {
    this.currentView = 'history';
    this.currentQuiz = null;
  }
}
