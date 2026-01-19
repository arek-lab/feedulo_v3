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

  // Graf zgodny z FastAPI StateGraph
  nodes: GraphNode[] = [
    { id: 'extract_cv', label: 'Wyciągam dane z CV', x: 100, y: 200, order: 1 },
    { id: 'job_description', label: 'Opracowuję opis oferty', x: 250, y: 200, order: 2 },
    { id: 'tools', label: 'Internet', x: 250, y: 80, order: 3 },
    { id: 'compare_cv_to_offer', label: 'Porównuję CV z ofertą', x: 400, y: 200, order: 4 },
    { id: 'human review', label: 'Oczekuję feedbacku', x: 550, y: 200, order: 5 },
    { id: 'collect all data', label: 'Zbieram informacje', x: 700, y: 200, order: 6 },
    { id: 'generate cv structure', label: 'Generuję strukturę HTML', x: 700, y: 80, order: 7 },
    { id: 'add style and optymize', label: 'Stylizuję i optymalizuję', x: 850, y: 140, order: 8 },
    { id: 'finalize', label: 'Finalizuję i zapisuję PDF', x: 1000, y: 200, order: 9 },
  ];

  connections = signal<Connection[]>([
    // START -> extract_cv
    { x1: 135, y1: 200, x2: 215, y2: 200, active: false, completed: false },
    // extract_cv -> job_description
    { x1: 285, y1: 200, x2: 365, y2: 200, active: false, completed: false },
    // job_description -> tools (conditional)
    { x1: 250, y1: 165, x2: 250, y2: 115, active: false, completed: false },
    // tools -> job_description (loop back)
    { x1: 285, y1: 80, x2: 285, y2: 165, active: false, completed: false },
    // job_description -> compare_cv_to_offer (conditional)
    { x1: 535, y1: 200, x2: 515, y2: 200, active: false, completed: false },
    // compare_cv_to_offer -> human review
    { x1: 585, y1: 200, x2: 665, y2: 200, active: false, completed: false },
    // human review -> collect all data
    { x1: 700, y1: 165, x2: 700, y2: 115, active: false, completed: false },
    // collect all data -> generate cv structure
    { x1: 735, y1: 80, x2: 815, y2: 120, active: false, completed: false },
    // generate cv structure -> add style and optymize
    { x1: 735, y1: 115, x2: 815, y2: 160, active: false, completed: false },
    // add style and optymize -> finalize (END)
    { x1: 885, y1: 140, x2: 965, y2: 180, active: false, completed: false },
  ]);

  completedNodes = new Set<string>();
  currentNode = computed(() => this.stream?.status()?.next_node || '');

  funFacts = [
    '💡 LangGraph pozwala budować złożone workflow AI z wieloma krokami decyzyjnymi',
    '🚀 Każdy węzeł w grafie może wykonywać niezależne operacje i zwracać różne ścieżki',
    '🎯 Twoje CV będzie zoptymalizowane pod systemy ATS używane przez rekruterów',
    '✨ AI analizuje tysiące udanych CV z Twojej branży dla najlepszych wyników',
    '🔍 Algorytm porównuje Twoje umiejętności z konkretnymi wymaganiami oferty pracy',
    '📊 Struktura CV jest automatycznie dostosowana do standardów branży IT',
    '🤖 Warunkowe ścieżki w grafie pozwalają na dynamiczne podejmowanie decyzji',
    '⚡ FastAPI + LangGraph to połączenie szybkości backendowej i inteligencji AI',
    '🎨 Generator styli CSS dopasowuje wizualne aspekty CV do najnowszych trendów',
    '📄 Format PDF jest generowany z zachowaniem pełnej responsywności i czytelności',
    '🔄 Graf może wykonać pętle (np. tools -> job_description) dla lepszych rezultatów',
    '🧠 Każdy agent w grafie ma własny kontekst i pamięć poprzednich kroków',
    '🛠️ Narzędzia internetowe są wywoływane tylko gdy AI uzna to za konieczne',
    '✅ Human-in-the-loop pozwala Ci kontrolować kluczowe decyzje w procesie',
    '🚦 StateGraph zarządza przepływem danych między wszystkimi węzłami automatycznie',
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
    }, 8000);

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
