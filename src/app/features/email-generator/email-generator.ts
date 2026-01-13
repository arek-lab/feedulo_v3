import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { Http, ResponseEmailModel } from './http';
import { ActualLabel, EmailFormValue, EmailStyleConfig, INDUSTRY_LABELS, LENGTH_LABELS, mapFormValueToEmailStyleSafe, PURPOSE_LABELS, TONE_LABELS } from './styles.model';
import { MarkdownModule, MarkdownComponent } from 'ngx-markdown';
import removeMarkdown from 'remove-markdown';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FeatureHeader } from '../../layouts/app/feature-header/feature-header';
import { Credits } from '../../services/credits';
import { CreditsError } from '../../layouts/app/credits-error/credits-error';


@Component({
  selector: 'app-email-generator',
  imports: [
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MarkdownComponent,
    MarkdownModule,
    FeatureHeader,
    CreditsError
],
  templateUrl: './email-generator.html',
  styleUrl: './email-generator.scss',
})
export class EmailGenerator {
  private fb = inject(FormBuilder);
  private httpService = inject(Http);
  private creditsService = inject(Credits)
  credits = this.creditsService.credits
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  isLoading = signal(false);
  responseData = signal<ResponseEmailModel | null>(null);
  choosenStyle = signal<ActualLabel | null>(null);
  userRequest = signal<string | null>(null);
  copied = signal(false);
  labels = {
    tone: TONE_LABELS,
    length: LENGTH_LABELS,
    industry: INDUSTRY_LABELS,
    purpose: PURPOSE_LABELS,
  };
  dataForm = this.fb.group({
    styleTone: ['st1'],
    stylePurpose: ['sp1'],
    styleLength: ['sl1'],
    styleIndustry: ['si1'],
    userQuery: ['', [Validators.required, Validators.minLength(20)]],
  });

  tones = Object.entries(TONE_LABELS).map(([key, value]) => ({
    id: key,
    label: value,
  }));
  lenghts = Object.entries(LENGTH_LABELS).map(([key, value]) => ({
    id: key,
    label: value,
  }));
  purposes = Object.entries(PURPOSE_LABELS).map(([key, value]) => ({
    id: key,
    label: value,
  }));
  industries = Object.entries(INDUSTRY_LABELS).map(([key, value]) => ({
    id: key,
    label: value,
  }));

  copyToClipboard() {
    const markdown = this.responseData()?.output_MD as string;
    const plainText = removeMarkdown(markdown);

    navigator.clipboard
      .writeText(plainText)
      .then(() => this.copied.set(true))
      .catch(() => alert('Nie udało się skopiować'));
  }

  onSubmit() {
    if (this.dataForm.invalid || this.credits() < 1) return;
    this.isLoading.set(true);
    const email_info = this.dataForm.value.userQuery as string;
    const email_style: EmailStyleConfig = mapFormValueToEmailStyleSafe(
      this.dataForm.value as EmailFormValue
    );
    this.httpService.generateEmail({ email_info, email_style }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.choosenStyle.set({
          tone: TONE_LABELS[this.dataForm.controls.styleTone.value as string],
          length:
            LENGTH_LABELS[this.dataForm.controls.styleLength.value as string],
          purpose:
            PURPOSE_LABELS[this.dataForm.controls.stylePurpose.value as string],
          industry:
            INDUSTRY_LABELS[
              this.dataForm.controls.styleIndustry.value as string
            ],
        });
        this.userRequest.set(email_info);
        this.responseData.set(res);
        this.dataForm.reset();
        this.formDirective.resetForm();
        this.dataForm.patchValue({
          styleTone: 'st1',
          stylePurpose: 'sp1',
          styleLength: 'sl1',
          styleIndustry: 'si1',
        });
        this.creditsService.credits.set(this.responseData()?.credtis!)
      },
      error: (err) => {
        this.isLoading.set(false);
        this.responseData.set({
          user_query: '',
          output_MD:
            'Pojawił sie nieoczekiwany problem. Spróbuj ponownie za chwilę.',
          validation_pass: false,
          email_title: '',
          credtis: 0,
        });
      },
    });
  }

  startNewQuery() {
    this.responseData.set(null);
  }
}
