import { Component, Input, inject } from '@angular/core';
import { MatCard, MatCardModule } from "@angular/material/card";
import { Storage } from '../reply-forge/storage';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-loveable-error',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './loveable-error.html',
  styleUrl: './loveable-error.scss',
})
export class LoveableError {
  private storageService = inject(Storage)
  @Input() errorMessage: string | null = null;

  resetError() {
    this.storageService.error.set(null);
    this.storageService.graphResponse.set(null)
    this.storageService.responseData.set(null)
    this.storageService.graphLoading.set(false)
    this.storageService.regexLoading.set(false)
  }
}
