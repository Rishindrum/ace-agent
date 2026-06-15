import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService, SyllabusQuestionPayload, QuizTelemetryPayload } from '../../services/api.service';

interface Question {
  question_text: string;
  options: string[];
  correct_option_index: number;
  topic: string;
  explanation: string;
  selected_option_index?: number;
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
  
  @Input() classId: string = 'default_class';
  @Input() set selectedWeek(value: number) {
    if (value) {
      this.weekNumber = value;
    }
  }
  weekNumber: number = 1;
  questionCount: number = 5;
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

  // Regeneration State
  isRegenModalOpen: boolean = false;
  regenPrompt: string = '';
  isRegenerating: boolean = false;

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

  startSyllabusQuiz(): void {
    if (!this.userId.trim() || !this.weekNumber || !this.questionCount) {
      this.statusMessage = 'Please fill out all fields.';
      return;
    }
    
    this.isLoading = true;
    this.statusMessage = `Generating syllabus quiz for Week ${this.weekNumber} using course materials...`;
    
    this.api.generateQuiz(this.weekNumber, this.questionCount, this.classId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.statusMessage = '';
        if (res && res.code === 'NO_MATERIALS_FOUND') {
          this.statusMessage = "No study materials found for this week. Please upload course materials (slides, notes, transcripts, or textbooks) for this week's topics in the Syllabus tab first to generate a quiz!";
        } else if (res && res.length > 0) {
          const mappedQuestions = res.map((q: any) => ({
            question_text: q.questionText || 'Question',
            options: q.options || [],
            correct_option_index: q.correctOptionIndex !== undefined ? q.correctOptionIndex : 0,
            topic: `Week ${this.weekNumber}`,
            explanation: 'Correct answer is marked below.'
          }));

          this.currentQuiz = {
            quiz_title: `Syllabus Quiz - Week ${this.weekNumber}`,
            questions: mappedQuestions
          };
          this.currentQuestionIndex = 0;
          this.selectedOptionIndex = null;
          this.correctAnswersCount = 0;
          this.showExplanation = false;
          this.quizFinished = false;
          this.currentView = 'quiz';
        } else {
          this.statusMessage = 'Failed to generate a valid quiz for this week. Ensure syllabus materials are uploaded/ingested.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 404 || err.error?.code === 'NO_MATERIALS_FOUND') {
          this.statusMessage = "No study materials found for this week. Please upload course materials (slides, notes, transcripts, or textbooks) for this week's topics in the Syllabus tab first to generate a quiz!";
        } else {
          this.statusMessage = 'Error generating syllabus quiz: ' + (err.error?.message || err.message || err);
        }
        console.error("Syllabus quiz generation error:", err);
      }
    });
  }

  openRegenModal(): void {
    this.regenPrompt = '';
    this.isRegenModalOpen = true;
  }

  closeRegenModal(): void {
    this.isRegenModalOpen = false;
  }

  submitRegeneration(): void {
    if (this.isRegenerating) return;
    this.isRegenerating = true;
    this.isLoading = true;
    this.statusMessage = `Steering Gemini and regenerating quiz for Week ${this.weekNumber}...`;

    this.api.generateQuiz(this.weekNumber, this.questionCount, this.classId, true, this.regenPrompt).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.isRegenerating = false;
        this.isRegenModalOpen = false;
        this.statusMessage = '';
        if (res && res.code === 'NO_MATERIALS_FOUND') {
          this.statusMessage = "No study materials found for this week. Please upload course materials (slides, notes, transcripts, or textbooks) for this week's topics in the Syllabus tab first to generate a quiz!";
        } else if (res && res.length > 0) {
          const mappedQuestions = res.map((q: any) => ({
            question_text: q.questionText || 'Question',
            options: q.options || [],
            correct_option_index: q.correctOptionIndex !== undefined ? q.correctOptionIndex : 0,
            topic: `Week ${this.weekNumber}`,
            explanation: 'Correct answer is marked below.'
          }));

          this.currentQuiz = {
            quiz_title: `Syllabus Quiz - Week ${this.weekNumber}`,
            questions: mappedQuestions
          };
          this.currentQuestionIndex = 0;
          this.selectedOptionIndex = null;
          this.correctAnswersCount = 0;
          this.showExplanation = false;
          this.quizFinished = false;
          this.currentView = 'quiz';
        } else {
          this.statusMessage = 'Failed to regenerate a valid quiz. Please try again.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.isRegenerating = false;
        this.isRegenModalOpen = false;
        if (err.status === 404 || err.error?.code === 'NO_MATERIALS_FOUND') {
          this.statusMessage = "No study materials found for this week. Please upload course materials (slides, notes, transcripts, or textbooks) for this week's topics in the Syllabus tab first to generate a quiz!";
        } else {
          this.statusMessage = 'Error regenerating quiz: ' + (err.error?.message || err.message || err);
        }
        console.error("Quiz regeneration error:", err);
      }
    });
  }

  selectOption(idx: number): void {
    if (this.selectedOptionIndex !== null) return; // Already answered
    
    this.selectedOptionIndex = idx;
    this.showExplanation = true;
    
    if (this.currentQuiz) {
      this.currentQuiz.questions[this.currentQuestionIndex].selected_option_index = idx;
      if (idx === this.currentQuiz.questions[this.currentQuestionIndex].correct_option_index) {
        this.correctAnswersCount++;
      }
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
    
    const primaryTopic = this.currentQuiz.questions[0]?.topic || this.syllabusName;
    
    this.isLoading = true;
    this.statusMessage = `Submitting score (${finalScorePercent}%) to BigQuery...`;

    // 1. Submit telemetry to the new BigQuery uploader if it's a syllabus quiz
    if (this.currentQuiz.quiz_title.startsWith('Syllabus Quiz')) {
      const telemetryQuestions = this.currentQuiz.questions.map((q, index) => ({
        id: `q-${index}`,
        selected_option_index: q.selected_option_index !== undefined ? q.selected_option_index : -1,
        correct_option_index: q.correct_option_index
      }));

      const telemetryPayload: QuizTelemetryPayload = {
        week_number: this.weekNumber,
        questions: telemetryQuestions
      };

      this.api.submitQuizTelemetry(telemetryPayload, this.classId).subscribe({
        next: (telemetryRes) => {
          console.log("[BigQuery Telemetry] Successfully streamed:", telemetryRes);
        },
        error: (err) => {
          console.error("[BigQuery Telemetry] Failed to stream:", err);
        }
      });
    }
    
    // 2. Submit to user score history (BigQuery performance list)
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
