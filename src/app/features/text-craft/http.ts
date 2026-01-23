import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LLMResponse, UserInput } from './model';



@Injectable({
  providedIn: 'root',
})
export class Http {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  editText(data: UserInput): Observable<LLMResponse> {
    return this.http.post<LLMResponse>(`${this.apiUrl}/text-craft/`, data);
  }
}
