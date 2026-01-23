import { Component, inject, signal, ViewChild } from '@angular/core';
import { DevelopmentLevel, Http, LeadershipStyle, UserData, LLMResponse } from './http';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FeatureHeader } from '../../layouts/app/feature-header/feature-header';
import { Credits } from '../../services/credits';
import { CreditsError } from '../../layouts/app/credits-error/credits-error';
import { AuthService } from '../../auth/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

const mock: LLMResponse = {
  feedback:
    'Dziękuję za wysiłek i zaangażowanie w realizację planu sprzedaży kredytów gotówkowych. Rozumiem, że sytuacja jest wyzwaniem, ale chciałbym lepiej zrozumieć, co według Ciebie stanowi największą przeszkodę w osiągnięciu wyznaczonych celów.  \n\nChętnie pomogę Ci opracować konkretne kroki, które będą jasne i łatwe do wdrożenia, aby poprawić efektywność sprzedaży. Proszę, przygotujmy wspólnie plan działań, obejmujący szczegółowe instrukcje – kiedy i jak dokładnie będziemy realizować kolejne etapy, by rozwinąć Twoje umiejętności i zwiększyć wyniki.  \n\nJeśli masz pytania lub potrzebujesz wsparcia w konkretnej części procesu, daj znać. Moje wsparcie jest do Twojej dyspozycji, a nasza rozmowa pomoże wyznaczyć najskuteczniejszą ścieżkę do osiągnięcia celów.',
  metadata: {
    development_level: 'd1',
    recommended_style: 's1',
    applied_style: 's1',
    is_aligned: true,
    warning: null,
    tokens: {
      input_tokens: 972,
      output_tokens: 235,
      total_tokens: 1207,
    },
    credits: 98,
  },
};


@Component({
  selector: 'app-feedbacks',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    TextFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatListModule,
    FeatureHeader,
    CreditsError
  ],
  templateUrl: './feedbacks.html',
  styleUrl: './feedbacks.scss',
})
export class Feedbacks {
  private httpService = inject(Http);
  private fb = inject(FormBuilder);
  private creditsService = inject(Credits)
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  private authService = inject(AuthService)
  isAuth = toSignal(this.authService.isAuthenticated$)
  styleAlert = signal<String | null>(null);
  responseData = signal<LLMResponse | null>(null);
  userQuery = signal<string | null>(null);
  isLoading = signal(false);
  copied = signal(false);
  credits = this.creditsService.credits

  dataForm = this.fb.group({
    leadershipStyle: ['', Validators.required],
    developmentLevel: ['', Validators.required],
    userQuery: ['', [Validators.required, Validators.minLength(20)]],
  });

  styleMapping = {
    s1: 'd1',
    s2: 'd2',
    s3: 'd3',
    s4: 'd4',
  };

  styleWarning = {
    s1: 'S1 (instruowanie) - najlepszy dla D1 (debiutant) - niskie kompetencje, wysokie zaangażowanie.',
    s2: 'S2 (konsultowanie) - najlepszy dla D2 (uczeń rozczarowany) - częściowe kompetencje, spadające zaangażowanie.',
    s3: 'S3 (wspieranie) - najlepszy dla D3 (praktyk ostrożny) - wysokie kompetencje, zmienne zaangażowanie.',
    s4: 'S4 (delegowanie) - najlepszy dla D4 (ekspert samodzielny) - wysokie kompetencje, wysokie zaangażowanie.',
  };

  onSubmit() {
    if (this.dataForm.invalid || this.credits() < 1 ) return
    this.isLoading.set(true);
    const userValue = this.dataForm.value as UserData;
    this.httpService.generateFeedback(userValue).subscribe({
      next: (res) => {
        this.responseData.set(res);
        this.userQuery.set(this.dataForm.get('userQuery')!.value);
        this.isLoading.set(false);
        this.dataForm.reset();
        this.formDirective.resetForm();
        this.styleAlert.set(null);
        this.credits.set(this.responseData()?.metadata.credits!)

      },
      error: (err) => {
        this.isLoading.set(false);
        this.dataForm.reset();
        this.formDirective.resetForm();
        this.styleAlert.set(null);
        this.responseData.set({
          feedback: 'Pojawił sie nieoczekiwany problem. Spróbuj ponownie za chwilę.',
          metadata: {
            development_level: 'd1',
            recommended_style: 's1',
            applied_style: 's1',
            is_aligned: true,
            warning: null,
            tokens: {
              input_tokens: 0,
              output_tokens: 0,
              total_tokens: 0,
            },
            credits: 0,
          },
        });
      },
    });
  }

  startNewQuery() {
    this.responseData.set(null);
  }

  copyToClipboard() {
    navigator.clipboard
      .writeText(this.responseData()?.feedback as string)
      .then(() => this.copied.set(true))
      .catch((err) => alert('Nie udało się skopiować'));
  }

  matchDevelopmentLevel() {
    this.styleAlert.set(null);
    const selectedStyle = this.dataForm.get('leadershipStyle')?.value as LeadershipStyle;

    if (selectedStyle) {
      const mappedValue = this.styleMapping[selectedStyle];
      this.dataForm.get('developmentLevel')?.setValue(mappedValue as DevelopmentLevel);
    }
  }

  validateStyle() {
    this.styleAlert.set(null);
    const selectedStyle = this.dataForm.get('leadershipStyle')?.value;

    if (selectedStyle && this.styleMapping[selectedStyle as LeadershipStyle]) {
      const mappedValue = this.styleMapping[selectedStyle as LeadershipStyle];

      if (!(mappedValue === this.dataForm.value.developmentLevel)) {
        this.styleAlert.set(
          'Styl ' +
            this.styleWarning[selectedStyle as LeadershipStyle] +
            ' Upewnij się, czy otrzymany feedback odpowiada Twoim założeniom.'
        );
      }
    }
  }
}
