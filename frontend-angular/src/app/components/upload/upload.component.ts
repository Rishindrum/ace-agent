import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from '../../services/api.service'; // Import Service

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatProgressBarModule
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | null = null;
  isLoading = false;
  responseMessage = '';

  constructor(private api: ApiService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.responseMessage = ''; 
  }

  // ... imports ...

  onUpload(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.responseMessage = 'Sending to AI Brain...';

    this.api.uploadSyllabus(this.selectedFile).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        // 1. SAFETY CHECK: Is the response completely empty?
        if (!res) {
          console.error("CRITICAL: Server returned empty response (null/undefined).");
          this.responseMessage = 'Error: No data received from server.';
          return; // Stop here to prevent crash
        }

        console.log("SERVER DATA RECEIVED:", res);

        // 2. SAFETY CHECK: Do we have the nodes count?
        // We check for both lowercase 'nodes' and uppercase 'NodesCreated' just in case
        const count = res.nodes || res.NodesCreated || 0;
        this.responseMessage = `Success! Found ${count} concepts.`;

        // 3. SAFETY CHECK: Do we have graph data?
        if (res.graph && Array.isArray(res.graph)) {
          console.log("Broadcasting graph data...", res.graph);
          this.api.updateGraphData(res.graph);
        } else {
          console.warn("Server response missing 'graph' array:", res);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error("HTTP Error:", err);
        this.responseMessage = `Error: ${err.message}`;
      }
    });
  }
}