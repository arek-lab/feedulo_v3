import { Component, computed, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { FeatureHeader } from '../../layouts/app/feature-header/feature-header';
import { HttpService } from './http.service';
import { SseService, ThreadReturn } from './sse.service';
import { StorageService } from './storage.service';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdditionalInfo } from './additional-info/additional-info';
import { DomSanitizer } from '@angular/platform-browser';
import { Credits } from '../../services/credits';
import { CreditsError } from '../../layouts/app/credits-error/credits-error';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../auth/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cv-upgrader',
  imports: [
    FeatureHeader,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    AdditionalInfo,
    CreditsError,
    MatProgressBarModule
  ],
  templateUrl: './cv-upgrader.html',
  styleUrl: './cv-upgrader.scss',
})
export class CvUpgrader {
  private sse = inject(SseService);
  private httpService = inject(HttpService);
  private fb = inject(FormBuilder);
  private storageService = inject(StorageService);
  private creditsService = inject(Credits)
  private authService = inject(AuthService)
  isAuth = toSignal(this.authService.isAuthenticated$)
  credits = this.creditsService.credits;
  upgraderError = this.storageService.upgraderError
  isLoading = this.storageService.isLoading;
  selectedFileName: string = '';
  fileError: string = '';
  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  private sanitizer = inject(DomSanitizer);
  finalHtml = this.storageService.finalHtml;
  html = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.finalHtml() ?? ''));

  dataForm = this.fb.group({
    cvFile: [this.fb.control<File | null>(null, Validators.required)],
    jobOffer: ['', [Validators.required]],
  });

  stream = signal<ThreadReturn | null>(null);
  threadId = this.storageService.threadId;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileError = '';

    if (file) {
      // 1. Sprawdzenie rozmiaru (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.setError('Plik jest za duży. Maksymalny rozmiar to 5MB.', event);
        return;
      }

      // 2. Sprawdzenie rozszerzenia
      const allowedExtensions = ['.docx'];
      const fileName = file.name.toLowerCase();
      const hasValidExtension = allowedExtensions.some((ext) => fileName.endsWith(ext));

      if (!hasValidExtension) {
        this.setError('Dozwolone są tylko pliki .docx', event);
        this.dataForm.patchValue({ cvFile: null });
        return;
      }

      // 3. Jeśli wszystko ok:
      this.selectedFileName = file.name;
      this.dataForm.patchValue({ cvFile: file });
      this.dataForm.get('cvFile')?.updateValueAndValidity();
    }
  }

  private setError(message: string, event: any) {
    this.fileError = message;
    this.selectedFileName = '';

    // Czyścimy input w HTML, aby można było wybrać ten sam plik ponownie
    if (event?.target) {
      event.target.value = '';
    }

    this.dataForm.patchValue({ cvFile: null });
    this.dataForm.get('cvFile')?.markAsTouched();
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      Object.keys(this.dataForm.controls).forEach((key) => {
        this.dataForm.get(key)?.markAsTouched();
      });
      return;
    }
    if (this.credits() < 20 ) return

    const cvFile = this.dataForm.get('cvFile')?.value as File | null;
    const jobOffer = this.dataForm.get('jobOffer')?.value as string;

    if (!cvFile) {
      this.fileError = 'Załączony plik nie mógł być załadowany, spróbuj ponownie';
      return;
    }

    const formData = new FormData();
    formData.append('cv_file', cvFile, cvFile.name);
    formData.append('job_offer', jobOffer);

    this.isLoading.set(true);

    this.httpService.startGraph(formData).subscribe({
      next: (res) => {
        this.credits.set(res.credits)
        this.threadId.set(res.thread_id);
        const newStream = this.sse.connect(res.thread_id);
        this.stream.set(newStream);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('❌ Błąd podczas startowania grafu:', err);
        this.isLoading.set(false);

        if (err.status === 400) {
          this.fileError = 'Nieprawidłowe dane wejściowe';
        } else if (err.status === 500) {
          this.fileError = 'Błąd serwera, spróbuj ponownie później';
        } else {
          this.fileError = 'Wystąpił nieoczekiwany błąd';
        }
      },
    });

    this.clearForm();
  }

  clearForm() {
    this.selectedFileName = '';
    this.fileError = '';
    const input = this.fileInput();
    if (input) {
      input.nativeElement.value = '';
    }
    this.dataForm.reset();
    this.formDirective.resetForm();
  }

  downloadFile() {
    const currentStream = this.stream();
    if (currentStream) {
      this.httpService.downloadFile(currentStream.status()?.result.file_id).subscribe({
        next: (blob) => {
          const link = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          link.href = objectUrl;
          link.download = 'CV';
          link.click();
          URL.revokeObjectURL(objectUrl);
          this.newQuery();
          this.clearForm();
        },
        error: (err) => {
          console.error('Błąd pobierania pliku', err);
        },
      });
    }
  }

  newQuery(){
    this.stream.set(null);
    this.isLoading.set(false);
    this.finalHtml.set(null);
  }

}

