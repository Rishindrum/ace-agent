import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';

interface Exercise {
  id: string;
  question_text: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
  selected_option_index?: number;
}

@Component({
  selector: 'app-lesson-interface',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './lesson-interface.component.html',
  styleUrls: ['./lesson-interface.component.scss']
})
export class LessonInterfaceComponent implements OnInit {
  private _selectedWeek: number = 1;

  @Input() set selectedWeek(value: number) {
    if (value && value !== this._selectedWeek) {
      this._selectedWeek = value;
      // Load new lesson when week changes
      if (this.initialized) {
        this.loadLesson();
      }
    }
  }

  get selectedWeek(): number {
    return this._selectedWeek;
  }

  @Output() exerciseCompleted = new EventEmitter<void>();

  isLoading: boolean = false;
  statusMessage: string = '';
  errorMessage: string = '';
  initialized: boolean = false;

  lessonMarkdown: string = '';
  exercises: Exercise[] = [];

  // Exercise submission state
  exerciseAnswersSubmitted: boolean = false;
  exercisePassed: boolean = false;
  scorePercentage: number = 0;
  correctAnswersCount: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.initialized = true;
    this.loadLesson();
  }

  loadLesson(): void {
    this.isLoading = true;
    this.statusMessage = 'Generating interactive lesson with Gemini...';
    this.errorMessage = '';
    this.lessonMarkdown = '';
    this.exercises = [];
    this.exerciseAnswersSubmitted = false;

    this.api.generateLesson(this.selectedWeek).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.statusMessage = '';
        if (res && res.lesson_markdown) {
          this.lessonMarkdown = res.lesson_markdown;
          this.exercises = res.exercises || [];
        } else {
          this.errorMessage = 'Failed to generate a valid lesson for this week. Make sure syllabus materials are uploaded.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.statusMessage = '';
        this.errorMessage = 'Error loading lesson: ' + (err.error?.message || err.message || err);
        console.error('Lesson generation error:', err);
      }
    });
  }

  selectOption(exerciseIdx: number, optionIdx: number): void {
    if (this.exerciseAnswersSubmitted) return;
    this.exercises[exerciseIdx].selected_option_index = optionIdx;
  }

  allExercisesAnswered(): boolean {
    if (this.exercises.length === 0) return false;
    return this.exercises.every(e => e.selected_option_index !== undefined);
  }

  submitAnswers(): void {
    if (!this.allExercisesAnswered()) return;

    this.isLoading = true;
    this.statusMessage = 'Validating answers and unlocking quiz...';

    const payload = this.exercises.map(e => ({
      exercise_id: e.id,
      selected_option_index: e.selected_option_index !== undefined ? e.selected_option_index : -1,
      correct_option_index: e.correct_option_index
    }));

    this.api.submitExercises(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.statusMessage = '';
        this.exerciseAnswersSubmitted = true;
        this.exercisePassed = res.passed;
        this.scorePercentage = res.score_percentage;
        this.correctAnswersCount = this.exercises.filter(
          e => e.selected_option_index === e.correct_option_index
        ).length;

        if (this.exercisePassed) {
          this.exerciseCompleted.emit();
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.statusMessage = '';
        this.errorMessage = 'Failed to submit answers: ' + (err.error?.message || err.message || err);
        console.error('Exercise submit error:', err);
      }
    });
  }

  resetExercises(): void {
    this.exerciseAnswersSubmitted = false;
    this.exercises.forEach(e => delete e.selected_option_index);
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
