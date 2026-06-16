import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IngestService } from '../../services/ingest.service';

@Component({
  selector: 'app-ingest',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './ingest.component.html',
  styleUrls: ['./ingest.component.scss']
})
export class IngestComponent {
  @Input() classId: string = 'default_class';
  @Output() onIngested = new EventEmitter<void>();

  weekNumber: number | null = null;
  topicName: string = '';
  rawText: string = '';
  isLoading: boolean = false;
  responseMessage: string = '';
  isSuccess: boolean = false;

  constructor(private ingestService: IngestService) {}

  onSubmit(): void {
    if (this.weekNumber === null || !this.topicName.trim() || !this.rawText.trim()) {
      this.responseMessage = 'Please fill out all fields.';
      this.isSuccess = false;
      return;
    }

    this.isLoading = true;
    this.responseMessage = 'Ingesting and embedding material...';

    this.ingestService.ingestMaterial(this.weekNumber, this.topicName, this.rawText, this.classId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.isSuccess = res.success;
        this.responseMessage = res.message;
        
        if (res.success) {
          // Clear inputs on successful ingestion
          this.weekNumber = null;
          this.topicName = '';
          this.rawText = '';
          this.onIngested.emit();
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.isSuccess = false;
        this.responseMessage = 'Error connecting to gateway: ' + err.message;
      }
    });
  }
}

