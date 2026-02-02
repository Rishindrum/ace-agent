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

  processGraphData(concepts: any[]) {
    const newNodes: any[] = [];
    const newLinks: any[] = [];
    
    // 1. Root Node
    newNodes.push({ id: 'root', label: 'Course Syllabus', data: { color: '#ff0000' } });

    concepts.forEach((concept, index) => {
      // 2. Topic Node
      if (!newNodes.find(n => n.id === concept.name)) {
        newNodes.push({ id: concept.name, label: concept.name });
      }

      // 3. Link Root -> Topic
      newLinks.push({
        id: `link-root-${index}`,
        source: 'root',
        target: concept.name,
        label: 'Covers'
      });

      // 4. Prereqs
      if (concept.prerequisites) {
        concept.prerequisites.forEach((prereqName: string, pIndex: number) => {
          if (!newNodes.find(n => n.id === prereqName)) {
            newNodes.push({ id: prereqName, label: prereqName });
          }
          newLinks.push({
            id: `link-${prereqName}-${concept.name}-${index}-${pIndex}`,
            source: prereqName,
            target: concept.name,
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