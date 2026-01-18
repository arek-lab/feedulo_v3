import { Injectable, signal, computed, Signal, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';


export interface StatusUpdate {
  status: 'running' | 'waiting_hitl' | 'completed'| 'error' | 'unknown';
  next_node: "extract_cv" | "job_description" | "compare_cv_to_offer" | "human review" |"collect all data" | "generate cv structure" | "add style and optymize" | "tools";
  message?: string;
  hitl_type?: string;
  hitl_data?: any;
  result?: any;
  error?: string;
  [key: string]: any;
}

interface StreamState {
  status: StatusUpdate | null;
  error: string | null;
  connected: boolean;
}

export interface ThreadReturn {
  status: Signal<StatusUpdate | null>;
  error: Signal<string | null | undefined>;
  isConnected: Signal<boolean>;
  isCompleted: Signal<boolean>;
  isError: Signal<boolean>;
  isHitlRequired: Signal<boolean>;
  result: Signal<any | null>;
  close: () => void;
}


@Injectable({ providedIn: 'root' })
export class SseService {
  private storageService = inject(StorageService)
  private readonly apiUrl = environment.apiUrl;
  private eventSources = new Map<string, EventSource>();
  private streams = new Map<string, ReturnType<typeof this.createStore>>();
  stream: ThreadReturn | null = null

  connect(threadId: string) {
    if (this.streams.has(threadId)) {
      return this.streams.get(threadId)!;
    }

    const store = this.createStore(threadId);
    this.streams.set(threadId, store);
    this.stream = store;
    return store;
  }

  private createStore(threadId: string): ThreadReturn {
    const state = signal<StreamState>({
      status: null,
      error: null,
      connected: false
    });

    const es = new EventSource(`${this.apiUrl}/stream/events/${threadId}`);
    this.eventSources.set(threadId, es);
    

    const updateStatus = (data: StatusUpdate) =>
      state.update(s => ({ ...s, status: data, error: null }));

    const setError = (message: string) =>
      state.update(s => ({ ...s, error: message }));

    es.addEventListener('status_update', e => {
      updateStatus(JSON.parse(e.data));
    });

    es.addEventListener('hitl_required', e => {
      updateStatus(JSON.parse(e.data));
    });

    es.addEventListener('completed', e => {
      const data = JSON.parse(e.data);
      updateStatus(data);

      if (data.result?.final_html) {
        this.storageService.finalHtml.set(data.result.final_html);
      } 
      
      this.close(threadId);         
    });

    es.addEventListener('error', () => {
        setError('Stream error occurred');
    });
    es.onopen = () => {
      state.update(s => ({ ...s, connected: true }));
    };

    es.onerror = () => {
      state.update(s => ({ ...s, connected: false }));
      if (es.readyState === EventSource.CLOSED) {
        this.close(threadId);
      }
    };

    /** COMPUTED – logika */
    const status = computed(() => state().status);
    const error = computed(() => state().error);
    const isConnected = computed(() => state().connected);

    const isCompleted = computed(() => status()?.status === 'completed');
    const isError = computed(() => status()?.status === 'error' || !!error());
    const isHitlRequired = computed(() => !!status()?.hitl_type);
    const result = computed(() => status()?.result ?? null);

    return {
      status,
      error,
      isConnected,
      isCompleted,
      isError,
      isHitlRequired,
      result,
      close: () => this.close(threadId)
    };
  }

  close(threadId: string) {
    this.eventSources.get(threadId)?.close();
    this.eventSources.delete(threadId);
    this.streams.delete(threadId);
  }
}

