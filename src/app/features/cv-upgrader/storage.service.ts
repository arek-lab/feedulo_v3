import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  threadId = signal('')
  isLoading = signal(false)
  finalHtml = signal<string | null>(null)
}
