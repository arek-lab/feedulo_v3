// graph-visualization.component.ts
import { Component, inject, effect, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SseService } from '../sse.service';
import { StorageService } from '../storage.service';


interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  order: number;
}

interface Connection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active: boolean;
  completed: boolean;
}

@Component({
  selector: 'app-graph-visualization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-visualization.html',
  styleUrl: './graph-visualization.scss'
})
export class GraphVisualization {
  private sse = inject(SseService);
  private storageService = inject(StorageService);
  
  stream = this.sse.stream;
  isLoading = this.storageService.isLoading;

  nodes: GraphNode[] = [
    { id: 'extract_cv', label: 'Ekstrakcja CV', x: 100, y: 200, order: 1 },
    { id: 'job_description', label: 'Opis stanowiska', x: 250, y: 100, order: 2 },
    { id: 'compare_cv_to_offer', label: 'Porównanie', x: 250, y: 300, order: 3 },
    { id: 'human review', label: 'Review', x: 400, y: 200, order: 4 },
    { id: 'collect all data', label: 'Dane', x: 550, y: 100, order: 5 },
    { id: 'generate cv structure', label: 'Struktura', x: 550, y: 300, order: 6 },
    { id: 'add style and optymize', label: 'Stylizacja', x: 700, y: 200, order: 7 },
  ];

  connections = signal<Connection[]>([
    { x1: 135, y1: 200, x2: 215, y2: 120, active: false, completed: false },
    { x1: 135, y1: 200, x2: 215, y2: 280, active: false, completed: false },
    { x1: 285, y1: 100, x2: 365, y2: 180, active: false, completed: false },
    { x1: 285, y1: 300, x2: 365, y2: 220, active: false, completed: false },
    { x1: 435, y1: 200, x2: 515, y2: 120, active: false, completed: false },
    { x1: 435, y1: 200, x2: 515, y2: 280, active: false, completed: false },
    { x1: 585, y1: 100, x2: 665, y2: 180, active: false, completed: false },
    { x1: 585, y1: 300, x2: 665, y2: 220, active: false, completed: false },
  ]);

  completedNodes = new Set<string>();
  currentNode = computed(() => this.stream?.status()?.next_node || '');

  funFacts = [
    '💡 LangGraph może wykonać setki kroków w jednym procesie',
    '🚀 Każdy węzeł grafu działa jak mini-agent AI',
    '🎯 Twoje CV będzie zoptymalizowane pod ATS',
    '✨ AI analizuje tysiące udanych CV dla najlepszych wyników',
    '🔍 Porównujemy Twoje umiejętności z wymaganiami oferty',
    '📊 Struktura CV jest dostosowana do branży IT',
  ];
  
  currentFactIndex = signal(0);
  currentFact = computed(() => this.funFacts[this.currentFactIndex()]);

  currentStatusMessage = computed(() => {
    const status = this.stream?.status()?.status;
    const graphStatus: Record<string, string> = {
      running: 'Pracujemy nad Twoim CV...',
      waiting_hitl: 'Czekamy na Twoje działanie...',
      completed: 'Twoje nowe CV jest gotowe!',
      error: 'Niestety wystąpił błąd. Spróbuj ponownie za chwilę.',
      unknown: 'Rozpoczynamy prace...',
    };
    return graphStatus[status || 'unknown'];
  });

  progress = computed(() => {
    const currentNodeId = this.currentNode();
    const currentNodeData = this.nodes.find(n => n.id === currentNodeId);
    if (!currentNodeData) return 0;
    
    return Math.round((currentNodeData.order / this.nodes.length) * 100);
  });

  constructor() {
    setInterval(() => {
      this.currentFactIndex.update(val => (val + 1) % this.funFacts.length);
    }, 4000);

    effect(() => {
      const nextNode = this.stream?.status()?.next_node;
      
      if (nextNode && !this.completedNodes.has(nextNode)) {
        const currentNodeData = this.nodes.find(n => n.id === nextNode);
        if (currentNodeData) {
          this.nodes.forEach(node => {
            if (node.order < currentNodeData.order) {
              this.completedNodes.add(node.id);
            }
          });
        }
      }

      this.updateConnections();
    });
  }

  isNodeActive(nodeId: string): boolean {
    return this.currentNode() === nodeId;
  }

  isNodeCompleted(nodeId: string): boolean {
    return this.completedNodes.has(nodeId);
  }

  isNodePending(nodeId: string): boolean {
    return !this.isNodeActive(nodeId) && !this.isNodeCompleted(nodeId);
  }

  updateConnections(): void {
    const current = this.currentNode();
    const currentIndex = this.nodes.findIndex(n => n.id === current);
    
    this.connections.update(conns => 
      conns.map((conn, idx) => ({
        ...conn,
        completed: idx < currentIndex,
        active: idx === currentIndex
      }))
    );
  }

  getNodeClasses(node: GraphNode): string {
    const classes = [];
    if (this.isNodeActive(node.id)) classes.push('active');
    if (this.isNodeCompleted(node.id)) classes.push('completed');
    if (this.isNodePending(node.id)) classes.push('pending');
    return classes.join(' ');
  }

  getConnectionClasses(conn: Connection): string {
    const classes = [];
    if (conn.active) classes.push('active');
    if (conn.completed) classes.push('completed');
    return classes.join(' ');
  }

  getNodeLabelY(node: GraphNode): number {
    return this.isNodeActive(node.id) || this.isNodeCompleted(node.id) ? 60 : 8;
  }
}
