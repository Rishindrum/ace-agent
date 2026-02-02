import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; // Import BehaviorSubject

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.production 
    ? environment.apiUrl + '/upload' 
    : environment.apiUrl;

  private wsUrl = environment.wsUrl;

  // 1. Create the store (The "Radio Station")
  // We start with null because there is no graph yet.
  private graphDataSubject = new BehaviorSubject<any>(null);
  
  // 2. Expose it as an Observable (The "Broadcast")
  // Components will subscribe to this to get updates.
  public currentGraphData = this.graphDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  uploadSyllabus(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}`, formData);
  }

  getChatSocket(): WebSocket {
    return new WebSocket(this.wsUrl);
  }
  // 3. Method to update the data
  // Call this when we get new data from the backend.
  updateGraphData(data: any) {
    this.graphDataSubject.next(data);
  }
}