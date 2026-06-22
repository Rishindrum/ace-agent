import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-graph-visualizer',
  standalone: true,
  imports: [CommonModule, NgxGraphModule],
  templateUrl: './graph-visualizer.component.html',
  styleUrls: ['./graph-visualizer.component.scss']
})
export class GraphVisualizerComponent implements OnInit {
  curve = shape.curveBundle.beta(1);
  
  // FIX: Initialize as empty arrays so the check "nodes.length > 0" works
  nodes: any[] = [];
  links: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.currentGraphData.subscribe(data => {
      // FIX: Only process if data is valid
      if (data && Array.isArray(data) && data.length > 0) {
        console.log("Graph Component received data:", data);
        this.processGraphData(data);
      } else {
        console.log("Graph Component waiting for data...");
      }
    });
  }

  sanitizeId(val: string): string {
    return 'node-' + val.replace(/[^a-zA-Z0-9_-]/g, '_');
  }

  processGraphData(concepts: any[]) {
    const newNodes: any[] = [];
    const newLinks: any[] = [];
    
    // 1. Root Node
    newNodes.push({ id: 'root', label: 'Course Syllabus', data: { color: '#ff0000' } });

    concepts.forEach((concept, index) => {
      // 2. Topic Node
      const topicId = this.sanitizeId(concept.name);
      if (!newNodes.find(n => n.id === topicId)) {
        newNodes.push({ id: topicId, label: concept.name });
      }

      // 3. Link Root -> Topic
      newLinks.push({
        id: `link-root-${index}`,
        source: 'root',
        target: topicId,
        label: 'Covers'
      });

      // 4. Prereqs
      if (concept.prerequisites) {
        concept.prerequisites.forEach((prereqName: string, pIndex: number) => {
          const prereqId = this.sanitizeId(prereqName);
          if (!newNodes.find(n => n.id === prereqId)) {
            newNodes.push({ id: prereqId, label: prereqName });
          }
          newLinks.push({
            id: `link-prereq-${index}-${pIndex}`,
            source: prereqId,
            target: topicId,
            label: 'Prereq'
          });
        });
      }
    });

    // Force update
    this.nodes = [...newNodes];
    this.links = [...newLinks];
  }
}