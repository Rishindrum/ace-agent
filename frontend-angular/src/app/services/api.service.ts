import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; // Import BehaviorSubject

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Keep these as the "Base" only
  private baseUrl = environment.apiUrl; 
  private wsBaseUrl = environment.wsUrl;

  private graphDataSubject = new BehaviorSubject<any>(null);
  public currentGraphData = this.graphDataSubject.asObservable();

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

  updateGraphData(data: any) {
    this.graphDataSubject.next(data);
  }
}