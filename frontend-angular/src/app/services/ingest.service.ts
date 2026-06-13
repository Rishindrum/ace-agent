import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngestService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ingestMaterial(weekNumber: number, topicName: string, rawText: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/ingest`, {
      week_number: weekNumber,
      topic_name: topicName,
      raw_text: rawText
    });
  }
}
