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
  class_streak?: number;
  global_streak?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Keep these as the "Base" only
  public baseUrl = environment.apiUrl; 
  private wsBaseUrl = environment.wsUrl;

  private graphDataSubject = new BehaviorSubject<any>(null);
  public currentGraphData = this.graphDataSubject.asObservable();

  private activeSyllabusSubject = new BehaviorSubject<string>('');
  public activeSyllabus = this.activeSyllabusSubject.asObservable();

  constructor(private http: HttpClient) { }

  uploadSyllabus(file: File, classId?: string, className?: string): Observable<any> {
    const cid = classId || 'default_class';
    const formData = new FormData();
    formData.append('file', file);
    if (className) formData.append('class_name', className);
    return this.http.post(`${this.baseUrl}/api/v1/classes/${cid}/syllabus/upload`, formData);
  }

  getChatSocket(classId?: string): WebSocket {
    const userId = localStorage.getItem('user_id') || 'default_user';
    const cid = classId || 'default_class';
    return new WebSocket(`${this.wsBaseUrl}/ws?user_id=${userId}&class_id=${cid}`);
  }

  listClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/v1/classes`);
  }

  submitQuizResult(userId: string, topicName: string, score: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/quiz/submit`, {
      user_id: userId,
      topic_name: topicName,
      score: score
    });
  }

  getQuizScores(userId: string, classId?: string): Observable<any> {
    const qClass = classId ? `&class_id=${classId}` : '';
    return this.http.get(`${this.baseUrl}/quiz/scores?user_id=${userId}${qClass}`);
  }

  generateAdaptiveQuiz(userId: string, syllabusName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/quiz/adaptive?user_id=${userId}&syllabus_name=${syllabusName}`);
  }

  generateQuiz(weekNumber: number, questionCount: number, classId?: string, regenerate?: boolean, regenerationPrompt?: string): Observable<SyllabusQuestionPayload[]> {
    const cid = classId || 'default_class';
    return this.http.post<SyllabusQuestionPayload[]>(`${this.baseUrl}/api/v1/classes/${cid}/study/quiz`, {
      week_number: weekNumber,
      question_count: questionCount,
      regenerate: regenerate || false,
      regeneration_prompt: regenerationPrompt || ''
    });
  }

  submitQuizTelemetry(payload: QuizTelemetryPayload, classId?: string): Observable<QuizTelemetryResponse> {
    const cid = classId || 'default_class';
    return this.http.post<QuizTelemetryResponse>(`${this.baseUrl}/api/v1/classes/${cid}/study/quiz/submit`, payload);
  }

  saveSchedulePreferences(preferredStudyTime: string, daysToAvoid: string[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/schedule/preferences`, {
      preferred_study_time: preferredStudyTime,
      days_to_avoid: daysToAvoid
    });
  }

  saveUserConfig(preferredStudyTimes: string[], weeklyCommitment: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/user/config`, {
      preferred_study_times: preferredStudyTimes,
      weekly_commitment: weeklyCommitment
    });
  }

  getUserScheduleSettings(classId?: string): Observable<any> {
    const q = classId ? `?class_id=${classId}` : '';
    return this.http.get<any>(`${this.baseUrl}/api/v1/user/schedule-settings${q}`);
  }

  saveUserScheduleSettings(preferredDays: number[], dailyPace: number, currentStreak: number, courseStartDate: string, classId?: string, className?: string, calendarEnabled?: boolean, calendarNotifs?: boolean, defaultQuizLen?: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/user/schedule-settings`, {
      preferred_days: preferredDays,
      daily_pace: dailyPace,
      current_streak: currentStreak,
      course_start_date: courseStartDate,
      class_id: classId || 'default_class',
      class_name: className || 'Default Class',
      calendar_enabled: calendarEnabled !== undefined ? calendarEnabled : undefined,
      calendar_notifs: calendarNotifs !== undefined ? calendarNotifs : undefined,
      default_quiz_len: defaultQuizLen !== undefined ? defaultQuizLen : undefined
    });
  }

  generateCramSession(startWeek: number, endWeek: number, classId?: string): Observable<any> {
    const cid = classId || 'default_class';
    return this.http.post<any>(`${this.baseUrl}/api/v1/classes/${cid}/study/cram`, {
      start_week: startWeek,
      end_week: endWeek
    });
  }

  getDailySessionState(classId?: string): Observable<any> {
    const cid = classId || 'default_class';
    return this.http.get<any>(`${this.baseUrl}/api/v1/classes/${cid}/study/today/state`);
  }

  submitExercises(answers: any[], classId?: string): Observable<any> {
    const cid = classId || 'default_class';
    return this.http.post<any>(`${this.baseUrl}/api/v1/classes/${cid}/study/exercise/submit`, {
      answers: answers
    });
  }

  generateLesson(weekNumber: number, classId?: string, regenerate?: boolean, regenerationPrompt?: string): Observable<any> {
    const cid = classId || 'default_class';
    return this.http.post<any>(`${this.baseUrl}/api/v1/classes/${cid}/study/lesson`, {
      week_number: weekNumber,
      regenerate: regenerate || false,
      regeneration_prompt: regenerationPrompt || ''
    });
  }

  checkTopicSufficiency(classId: string, weekNumber?: number): Observable<any> {
    const cid = classId || 'default_class';
    const q = weekNumber !== undefined ? `?week_number=${weekNumber}` : '';
    return this.http.get<any>(`${this.baseUrl}/api/v1/classes/${cid}/study/sufficiency${q}`);
  }

  deleteClass(classId: string): Observable<any> {
    return this.http.delete<any>(`${`${this.baseUrl}/api/v1/classes/${classId}`}`);
  }

  getSyllabus(classId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/v1/classes/${classId}/syllabus`);
  }

  editSyllabus(classId: string, weeks: any[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/v1/classes/${classId}/syllabus`, { weeks });
  }

  getMaterials(classId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/v1/classes/${classId}/materials`);
  }

  deleteMaterial(classId: string, materialId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/v1/classes/${classId}/materials/${materialId}`);
  }

  uploadChatFile(classId: string, file: File): Observable<any> {
    const cid = classId || 'default_class';
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/api/v1/classes/${cid}/chat/upload`, formData);
  }

  resetWeekProgress(classId: string, weekNumber: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/classes/${classId}/study/week/${weekNumber}/reset`, {});
  }

  updateGraphData(data: any) {
    this.graphDataSubject.next(data);
  }

  updateActiveSyllabus(name: string) {
    this.activeSyllabusSubject.next(name);
  }
}