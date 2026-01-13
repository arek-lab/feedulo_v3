import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmailStyleConfig } from './styles.model';

export interface ResponseEmailModel {
  user_query: string;
  output_MD: string;
  validation_pass?: boolean;
  email_title?: string;
  credtis: number;
}

export interface EmailUserData {
  email_info: string;
  email_style: EmailStyleConfig;
}

@Injectable({
  providedIn: 'root',
})
export class Http {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  generateEmail(data: EmailUserData): Observable<ResponseEmailModel> {
    return this.http.post<ResponseEmailModel>(`${this.apiUrl}/email/`, data);
  }
}
