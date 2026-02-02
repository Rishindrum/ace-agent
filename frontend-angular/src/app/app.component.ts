import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './components/upload/upload.component';
import { GraphVisualizerComponent } from './components/graph-visualizer/graph-visualizer.component';
import { ChatInterfaceComponent } from './components/chat-interface/chat-interface.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UploadComponent, GraphVisualizerComponent, ChatInterfaceComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ace Agent';
}