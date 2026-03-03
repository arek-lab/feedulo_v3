import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegexResponse, ChatMessage, ProcessRequest, Http } from '../http';
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from '@angular/material/button';
import { DecimalPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Storage } from '../storage';
import { Credits } from '../../../../services/credits';

@Component({
  selector: 'app-regex-review',
  imports: [
    ReactiveFormsModule,
  MatTabsModule,
  MatListModule,
  MatChipsModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatTooltipModule,
  DecimalPipe,
],
  templateUrl: './regex-review.html',
  styleUrl: './regex-review.scss',
})
export class RegexReview {
  private httpService = inject(Http)
  private storageService = inject(Storage)
  private creditService = inject(Credits)
  @Input() response!: RegexResponse;
  graphResponse = this.storageService.graphResponse
  reviewForm!: FormGroup;
  credits = this.creditService.credits

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      selectedCandidates: [this.response.candidates],
      selectedRejected:   [[]],
    });
  }

  get selectedCandidates(): ChatMessage[] {
    return this.reviewForm.get('selectedCandidates')?.value ?? [];
  }

  get selectedRejected(): ChatMessage[] {
    return this.reviewForm.get('selectedRejected')?.value ?? [];
  }

  get totalSelected(): number {
    return this.selectedCandidates.length + this.selectedRejected.length;
  }

  onClear(): void {
    this.reviewForm.reset({
      selectedCandidates: [],
      selectedRejected:   [],
    });
  }

  onSubmit(): void {
    const selected: ChatMessage[] = [
    ...this.selectedCandidates,
    ...this.selectedRejected,
  ];
  if (!selected.length) return;

  const candidates = selected
    .filter(item => item.message?.trim())
    .map(item => ({
      username: item.username,
      timestamp: item.timestamp,
      message: item.message,
      has_images: item.has_images,
      is_forwarded: item.is_forwarded,
      role: item.role,
      skip: item.skip,
      auto_reject_reason: item.auto_reject_reason ?? null,
      needs_help_score: item.needs_help_score ?? 0,
    }));

  if (!candidates.length) return;

  this.storageService.graphLoading.set(true)

  const payload: ProcessRequest = {
    candidates,
    max_concurrent: 15,
    batch_size: 20,
  };

  const emptyState = { selectedCandidates: [], selectedRejected: [] };

  this.httpService.processMessages(payload).subscribe({
    next: res => {
      this.graphResponse.set(res)
      this.credits.set(res.credits)
      this.reviewForm.reset(emptyState)
      this.storageService.graphLoading.set(false)
    },
    error: err => {
      this.storageService.error.set(`Wystąpił błąd. Spróbuj ponownie.`)
      this.storageService.graphLoading.set(false)
      this.reviewForm.reset(emptyState)
      this.graphResponse.set(null)
    }
  })
}
}


