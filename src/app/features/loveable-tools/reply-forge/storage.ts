import { Injectable, signal } from '@angular/core';
import { GraphResponse, RegexResponse } from './http';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  graphResponse = signal<GraphResponse | null>(null)
  responseData = signal<RegexResponse | null>(null)
  error = signal<string | null>(null)
  regexLoading = signal(false)
  graphLoading = signal(false)
}
