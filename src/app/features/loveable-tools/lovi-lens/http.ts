import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface UserInput {
  query: string
}

export interface LLMResponse {
  query: string;
  response: string;
  credits: number;
}


@Injectable({
  providedIn: 'root',
})
export class Http {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  ragRequest(data: UserInput): Observable<LLMResponse> {
    return this.http.post<LLMResponse>(`${this.apiUrl}/loveable-rag`, data);
  }

}
