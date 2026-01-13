import { Component, inject, input } from '@angular/core';
import { StorageService } from '../storage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HITLFeedbackRequest, HttpService } from '../http.service';
import {  MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cv-info',
  imports: [
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './cv-info.html',
  styleUrl: './cv-info.scss',
})
export class CvInfo {
  missing_info = input.required<string[]>();
  private storageService = inject(StorageService);
  private httpService = inject(HttpService);
  threadId = this.storageService.threadId;
  isLoading = this.storageService.isLoading;

  dataForm = new FormGroup({
    feedback: new FormControl(''),
  });

  onSubmit() {
    this.isLoading.set(true);
    const requestData: HITLFeedbackRequest = {
      hitl_type: 'additional_info',
      additional_info: this.dataForm.value.feedback ?? 'Brak dodatkowych informacji od użytkownika',
    };
    this.httpService.submitHitlFeedback(this.threadId(), requestData).subscribe({
      next: (res) => {
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
      },
    });
  }

}
