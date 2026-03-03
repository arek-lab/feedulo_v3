import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ChatMessage {
  username: string;
  timestamp: string;
  message: string;
  has_images: boolean;
  is_forwarded: boolean;
  role: string;
  skip: boolean;
  auto_reject_reason: string | null;
  needs_help_score?: number; 
  _uid: string
}

export interface RegexResponse {
  candidates_count: number;
  total_count: number;
  candidates: ChatMessage[];
  rejected: ChatMessage[];
}

export interface ProcessRequest {
  candidates: Partial<ChatMessage>[];
  max_concurrent?: number;
  batch_size?: number;
}

export interface OriginalMessage {
  username: string;
  timestamp: string;
  message: string;
  has_images: boolean;
  is_forwarded: boolean;
  role: string;
  skip: boolean;
  auto_reject_reason: string | null;
  needs_help_score: number;
}

export interface LeadItem {
  original_message: OriginalMessage;
  message: string;
  user: any | null;
  is_lead: boolean;
  rag_insight: string | null;
  reply: string;
}

export interface GraphResponse {
  leads: LeadItem[];
  no_leads: LeadItem[];
  errors: any[];
  credits: number;
}

@Injectable({
  providedIn: 'root',
})
export class Http {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  regexCheck(data: FormData): Observable<RegexResponse> {
    return this.http.post<RegexResponse>(`${this.apiUrl}/loveable-regex-check`, data);
  }

  processMessages(candidates: ProcessRequest): Observable<GraphResponse>{
    return this.http.post<GraphResponse>(`${this.apiUrl}/loveable-graph`, candidates)    
  }
}
