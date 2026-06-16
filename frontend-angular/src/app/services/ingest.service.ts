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

  ingestMaterial(weekNumber: number, topicName: string, rawText: string, classId?: string, file?: File | null, force: boolean = false): Observable<any> {
    const cid = classId || 'default_class';
    const formData = new FormData();
    formData.append('week_number', weekNumber.toString());
    formData.append('topic_name', topicName);
    formData.append('raw_text', rawText);
    if (force) {
      formData.append('force', 'true');
    }
    if (file) {
      formData.append('file', file);
    }
    return this.http.post(`${this.baseUrl}/api/v1/classes/${cid}/materials/upload`, formData);
  }
}
