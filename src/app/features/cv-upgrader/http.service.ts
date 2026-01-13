import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GraphStartResponse } from './cv-upgrader.model';


export type HITLType = 'additional_info' | 'acceptation';

export interface HITLFeedbackRequest {
  hitl_type: HITLType;
  additional_info?: string | null;
  accepted_cv_data?: Record<string, any>;
}

export interface HITLFeedbackResponse {
  threadId: string;
  status?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;


  startGraph(data: FormData): Observable<GraphStartResponse> {
    return this.http.post<GraphStartResponse>(
      `${this.apiUrl}/graph/start`,
      data
    );
  }

  submitHitlFeedback(thread_id: string, data: HITLFeedbackRequest):
  Observable<HITLFeedbackResponse> {
    return this.http.post<HITLFeedbackResponse>(
      `${this.apiUrl}/graph/hitl/${thread_id}`, data
    )
  }

  downloadFile(fileId: string) {
    return this.http.get(`${this.apiUrl}/graph/download/${fileId}`, { responseType: 'blob' })
}
}
