import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; // Import BehaviorSubject

import { environment } from '../../environments/environment';

export interface SyllabusQuestionPayload {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
}

export interface QuizTelemetryQuestion {
  id: string;
  selected_option_index: number;
  correct_option_index: number;
}

export interface QuizTelemetryPayload {
  week_number: number;
  questions: QuizTelemetryQuestion[];
}

export interface QuizTelemetryResponse {
  score: number;
  total_questions: number;
  percentage: number;
  confirmed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Keep these as the "Base" only
  private baseUrl = environment.apiUrl; 
  private wsBaseUrl = environment.wsUrl;

  private graphDataSubject = new BehaviorSubject<any>(null);
  public currentGraphData = this.graphDataSubject.asObservable();

  private activeSyllabusSubject = new BehaviorSubject<string>('');
  public activeSyllabus = this.activeSyllabusSubject.asObservable();

  constructor(private http: HttpClient) { }

  uploadSyllabus(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    // EXPLICITLY add /upload here. 
    // This ensures it works in both dev and prod.
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getChatSocket(): WebSocket {
    // EXPLICITLY add /ws here.
    return new WebSocket(`${this.wsBaseUrl}/ws`);
  }

  submitQuizResult(userId: string, topicName: string, score: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/quiz/submit`, {
      user_id: userId,
      topic_name: topicName,
      score: score
    });
  }

  getQuizScores(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/quiz/scores?user_id=${userId}`);
  }

  generateAdaptiveQuiz(userId: string, syllabusName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/quiz/adaptive?user_id=${userId}&syllabus_name=${syllabusName}`);
  }

  generateQuiz(weekNumber: number, questionCount: number): Observable<SyllabusQuestionPayload[]> {
    return this.http.post<SyllabusQuestionPayload[]>(`${this.baseUrl}/api/v1/quiz`, {
      week_number: weekNumber,
      question_count: questionCount
    });
  }

  submitQuizTelemetry(payload: QuizTelemetryPayload): Observable<QuizTelemetryResponse> {
    return this.http.post<QuizTelemetryResponse>(`${this.baseUrl}/api/v1/quiz/submit`, payload);
  }

  updateGraphData(data: any) {
    this.graphDataSubject.next(data);
  }

  updateActiveSyllabus(name: string) {
    this.activeSyllabusSubject.next(name);
  }
}