import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  threadId = signal('')
  isLoading = signal(false)
  finalHtml = signal<string | null>(null)
  upgraderError = signal<string | null>(null)
  missingInfoCompleted = signal(false)
  acceptDataCompleted = signal(false)
}
