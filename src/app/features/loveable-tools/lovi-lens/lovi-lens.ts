import { Component, inject, signal, ViewChild } from '@angular/core';
import { FeatureHeader } from '../../../layouts/app/feature-header/feature-header';
import { CreditsError } from '../../../layouts/app/credits-error/credits-error';
import { Credits } from '../../../services/credits';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Http, LLMResponse, UserInput } from './http';
import { MarkdownModule, MarkdownComponent } from 'ngx-markdown';
import removeMarkdown from 'remove-markdown';


@Component({
  selector: 'app-lovi-lens',
  imports: [
    FeatureHeader,
    CreditsError,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MarkdownModule,
],
  templateUrl: './lovi-lens.html',
  styleUrl: './lovi-lens.scss',
})
export class LoviLens {
  private fb = inject(FormBuilder);
  private creditsService = inject(Credits)
  private httpService = inject(Http)
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  credits = this.creditsService.credits
  isLoading = signal(false);
  responseData = signal<LLMResponse | null>(null)
  copied = signal(false)

  dataForm = this.fb.group({
    userQuery: ['', [Validators.required, Validators.minLength(10)]],
  })

  onSubmit(){
    if (this.dataForm.invalid || this.credits() < 1 ) return;
    const userQuery: UserInput = {
      query: this.dataForm.value.userQuery!
    }
    this.isLoading.set(true)
    
    this.httpService.ragRequest(userQuery)
    .subscribe({
      next: res => {
        this.isLoading.set(false);
        this.responseData.set(res)
        this.dataForm.reset()
        this.formDirective.resetForm();
        this.credits.set(this.responseData()?.credits!)
      },
      error: err => {
        this.isLoading.set(false);
        this.responseData.set(
          {
            query: this.dataForm.value.userQuery!,
            response: `Powstał błąd, spróbuj ponownie lub powiadom administratora
            Błąd: ${err}
            `,
            credits: this.credits()
          }
        )
      }
    }) 

  }

    startNewQuery() {
      this.responseData.set(null);
      this.copied.set(false)
    }

copyToClipboard() {
    const markdown = this.responseData()?.response as string;
    const plainText = removeMarkdown(markdown);

    navigator.clipboard
      .writeText(plainText)
      .then(() => this.copied.set(true))
      .catch(() => alert('Nie udało się skopiować'));
  }
}