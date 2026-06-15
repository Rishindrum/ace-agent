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
  @Output() startQuiz = new EventEmitter<void>();

  @Input() classId: string = 'default_class';

  private _dailyState: any = { lesson_completed: false, exercises_completed: false, quiz_unlocked: false };

  @Input() set dailyState(value: any) {
    if (value) {
      this._dailyState = value;
      this.updateStepFromState();
    }
  }

  get dailyState(): any {
    return this._dailyState;
  }

  currentStep: number = 1;

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

  // Regeneration State
  isRegenModalOpen: boolean = false;
  regenPrompt: string = '';
  isRegenerating: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.initialized = true;
    this.loadLesson();
  }

  updateStepFromState(): void {
    if (this._dailyState.quiz_unlocked || this._dailyState.exercises_completed) {
      this.currentStep = 3;
    } else if (this._dailyState.lesson_completed) {
      if (this.currentStep < 2) {
        this.currentStep = 2;
      }
    } else {
      this.currentStep = 1;
    }
  }

  canGoToStep2(): boolean {
    return this._dailyState.lesson_completed || this.currentStep >= 2;
  }

  goToStep(step: number): void {
    if (step === 2 && !this.canGoToStep2()) return;
    if (step === 3 && !this._dailyState.quiz_unlocked) return;
    this.currentStep = step;
  }

  proceedToPractice(): void {
    this.currentStep = 2;
    this._dailyState.lesson_completed = true;
    this.exerciseCompleted.emit(); // notify parent that lesson is read
  }

  loadLesson(): void {
    this.isLoading = true;
    this.statusMessage = 'Generating interactive lesson with Gemini...';
    this.errorMessage = '';
    this.lessonMarkdown = '';
    this.exercises = [];
    this.exerciseAnswersSubmitted = false;

    this.api.generateLesson(this.selectedWeek, this.classId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.statusMessage = '';
        if (res && res.code === 'NO_MATERIALS_FOUND') {
          this.errorMessage = "No study materials found for this week. Please upload course materials (slides, notes, transcripts, or textbooks) for this week's topics in the Syllabus tab first to generate a lesson!";
        } else if (res && res.lesson_markdown) {
          this.lessonMarkdown = res.lesson_markdown;
          this.exercises = res.exercises || [];
          this.updateStepFromState();
        } else {
          this.errorMessage = 'Failed to generate a valid lesson for this week. Make sure syllabus materials are uploaded.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.statusMessage = '';
        if (err.status === 404 || err.error?.code === 'NO_MATERIALS_FOUND') {
          this.errorMessage = "No study materials found for this week. Please upload course materials (slides, notes, transcripts, or textbooks) for this week's topics in the Syllabus tab first to generate a lesson!";
        } else {
          this.errorMessage = 'Error loading lesson: ' + (err.error?.message || err.message || err);
        }
        console.error('Lesson generation error:', err);
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
    this.statusMessage = 'Steering Gemini with instruction and regenerating lesson...';
    this.errorMessage = '';

    this.api.generateLesson(this.selectedWeek, this.classId, true, this.regenPrompt).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.isRegenerating = false;
        this.isRegenModalOpen = false;
        this.statusMessage = '';
        if (res && res.code === 'NO_MATERIALS_FOUND') {
          this.errorMessage = "No study materials found for this week. Please upload course materials (slides, notes, transcripts, or textbooks) for this week's topics in the Syllabus tab first to generate a lesson!";
        } else if (res && res.lesson_markdown) {
          this.lessonMarkdown = res.lesson_markdown;
          this.exercises = res.exercises || [];
          this.resetExercises();
          this.updateStepFromState();
        } else {
          this.errorMessage = 'Failed to generate a valid lesson for this week. Make sure syllabus materials are uploaded.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.isRegenerating = false;
        this.isRegenModalOpen = false;
        this.statusMessage = '';
        if (err.status === 404 || err.error?.code === 'NO_MATERIALS_FOUND') {
          this.errorMessage = "No study materials found for this week. Please upload course materials (slides, notes, transcripts, or textbooks) for this week's topics in the Syllabus tab first to generate a lesson!";
        } else {
          this.errorMessage = 'Error regenerating lesson: ' + (err.error?.message || err.message || err);
        }
        console.error('Lesson regeneration error:', err);
      }
    });
  }

  selectOption(exerciseIdx: number, optionIdx: number): void {
    if (this.exerciseAnswersSubmitted) return;
    if (this.exercises[exerciseIdx].selected_option_index !== undefined) return;
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

    this.api.submitExercises(payload, this.classId).subscribe({

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
          this._dailyState.exercises_completed = true;
          this._dailyState.quiz_unlocked = true;
          this.currentStep = 3;
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
    this.exercises.forEach(e => {
      e.selected_option_index = undefined;
    });
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
