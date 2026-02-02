import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon'; 
// 1. IMPORT THE SERVICE
import { ApiService } from '../../services/api.service';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat-interface',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss']
})
export class ChatInterfaceComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  private socket: WebSocket | null = null;

  // 2. INJECT THE SERVICE
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
    // 3. CHANGE THIS LINE (The Fix)
    // Old: this.socket = new WebSocket('ws://localhost:8080/ws');
    // New: Ask the service for the correct connection (Cloud or Local)
    this.socket = this.tutorService.getChatSocket();

    this.socket.onopen = () => {
      console.log('Connected to Chat Server');
      this.messages.push({
        text: "Connected to Gemini 2.5 Brain. Ready to chat.", 
        sender: 'bot', 
        timestamp: new Date()
      });
    };

    this.socket.onmessage = (event) => {
      // NOTE: Our Go backend sends plain text, not JSON. 
      // I've updated this to handle text safely so it doesn't crash.
      try {
        const data = JSON.parse(event.data);
        this.messages.push({
          text: data.text || data, // Handle object or string
          sender: 'bot',
          timestamp: new Date()
        });
      } catch (e) {
        // If it's just plain text (not JSON), use it directly
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

  sendMessage() {
    if (!this.newMessage.trim() || !this.socket) return;

    const textToSend = this.newMessage;
    this.messages.push({
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    });

    // Send simple text to backend (since our Go handler reads raw bytes)
    this.socket.send(textToSend);

    this.newMessage = '';
  }
}