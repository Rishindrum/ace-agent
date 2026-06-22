import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon'; 
import { ApiService } from '../../services/api.service';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  fileName?: string;
  fileText?: string;
}

@Component({
  selector: 'app-chat-interface',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss']
})
export class ChatInterfaceComponent implements OnInit, OnDestroy {
  @Input() classId: string = 'default_class';
  @Input() className: string = 'Default Class';

  messages: ChatMessage[] = [];
  newMessage: string = '';
  private socket: WebSocket | null = null;

  // File Upload State
  attachedFileName: string = '';
  attachedFileText: string = '';
  isUploadingFile: boolean = false;
  isViewModalOpen: boolean = false;
  viewingFileText: string = '';
  viewingFileName: string = '';

  constructor(private tutorService: ApiService) {}

  ngOnInit() {
    this.connect();
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  }

  connect() {
    this.socket = this.tutorService.getChatSocket(this.classId);

    this.socket.onopen = () => {
      console.log('Connected to Chat Server');
      this.messages.push({
        text: `Hello! Welcome to ${this.className}. I'm Ace, your study assistant for this class. Whether you need help understanding the curriculum roadmap, reviewing course materials, or mastering this week's topics, feel free to ask me anything about our course!`, 
        sender: 'bot', 
        timestamp: new Date()
      });
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messages.push({
          text: data.text || data, 
          sender: 'bot',
          timestamp: new Date()
        });
      } catch (e) {
        this.messages.push({
          text: event.data,
          sender: 'bot',
          timestamp: new Date()
        });
      }
    };

    this.socket.onclose = () => {
      console.log('Disconnected from Chat Server');
    };
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('chat-file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.isUploadingFile = true;
    this.attachedFileName = file.name;
    this.attachedFileText = '';

    this.tutorService.uploadChatFile(this.classId, file).subscribe({
      next: (res) => {
        this.isUploadingFile = false;
        if (res && res.success && res.parsed_text) {
          this.attachedFileText = res.parsed_text;
        } else {
          alert('Failed to parse file: ' + (res.message || 'Unknown error'));
          this.removeAttachedFile();
        }
      },
      error: (err) => {
        this.isUploadingFile = false;
        alert('File upload failed: ' + (err.error?.message || err.message || err));
        this.removeAttachedFile();
      }
    });

    // Reset input
    event.target.value = '';
  }

  removeAttachedFile(): void {
    this.attachedFileName = '';
    this.attachedFileText = '';
  }

  openPreview(fileName: string, fileText: string): void {
    this.viewingFileName = fileName;
    this.viewingFileText = fileText;
    this.isViewModalOpen = true;
  }

  closePreview(): void {
    this.isViewModalOpen = false;
    this.viewingFileName = '';
    this.viewingFileText = '';
  }

  sendMessage() {
    if (!this.newMessage.trim() && !this.attachedFileText) return;
    if (!this.socket) return;

    let textToSend = this.newMessage;
    const fileName = this.attachedFileName;
    const fileText = this.attachedFileText;

    if (fileText) {
      textToSend = `[Document Context:
Filename: ${fileName}
Content:
${fileText}
]

Question/Instructions:
${this.newMessage || 'Summarize this document and tell me the key takeaways.'}`;
    }

    this.messages.push({
      text: this.newMessage || `Uploaded and analyzing document: ${fileName}`,
      sender: 'user',
      timestamp: new Date(),
      fileName: fileName ? fileName : undefined,
      fileText: fileText ? fileText : undefined
    });

    this.socket.send(textToSend);

    this.newMessage = '';
    this.removeAttachedFile();
  }
}