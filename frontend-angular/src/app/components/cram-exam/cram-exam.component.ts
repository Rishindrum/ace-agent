import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cram-exam',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './cram-exam.component.html',
  styleUrls: ['./cram-exam.component.scss']
})
export class CramExamComponent implements OnInit {
  @Input() weeks: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  @Input() cramStartWeek: number = 1;
  @Input() cramEndWeek: number = 4;
  @Input() classId: string = 'default_class';
  @Output() close = new EventEmitter<void>();

  isCramLoading: boolean = false;
  cramData: any = null;
  cramError: string = '';
  cramCorrectAnswersCount: number = 0;
  cramGraded: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  closeCramModal(): void {
    this.close.emit();
  }

  startCramSession(): void {
    if (this.cramStartWeek > this.cramEndWeek) {
      this.cramError = 'Start week must be less than or equal to end week.';
      return;
    }
    this.isCramLoading = true;
    this.cramError = '';
    this.cramData = null;

    this.api.generateCramSession(Number(this.cramStartWeek), Number(this.cramEndWeek), this.classId).subscribe({
      next: (res) => {
        this.isCramLoading = false;
        if (res && res.dense_review_markdown) {
          this.cramData = res;
          this.cramData.rapid_fire_quiz.forEach((q: any) => {
            q.selected_option_index = undefined;
          });
          this.cramGraded = false;
          this.cramCorrectAnswersCount = 0;
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

  selectCramQuestionOption(qIdx: number, optIdx: number): void {
    if (this.cramGraded) return;
    this.cramData.rapid_fire_quiz[qIdx].selected_option_index = optIdx;
  }

  gradeCramQuiz(): void {
    this.cramCorrectAnswersCount = 0;
    this.cramData.rapid_fire_quiz.forEach((q: any) => {
      if (q.selected_option_index === q.correct_option_index) {
        this.cramCorrectAnswersCount++;
      }
    });
    this.cramGraded = true;
  }

  resetCramQuiz(): void {
    this.cramGraded = false;
    this.cramCorrectAnswersCount = 0;
    this.cramData.rapid_fire_quiz.forEach((q: any) => {
      q.selected_option_index = undefined;
    });
  }

  allCramQuestionsAnswered(): boolean {
    if (!this.cramData || !this.cramData.rapid_fire_quiz) return false;
    return this.cramData.rapid_fire_quiz.every((q: any) => q.selected_option_index !== undefined);
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
