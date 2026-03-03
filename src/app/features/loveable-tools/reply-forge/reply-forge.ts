import { Component, ElementRef, inject, signal, viewChild, ViewChild } from '@angular/core';
import { FeatureHeader } from '../../../layouts/app/feature-header/feature-header';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credits } from '../../../services/credits';
import { Http, RegexResponse } from './http';
import { CreditsError } from '../../../layouts/app/credits-error/credits-error';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RegexReview } from './regex-review/regex-review';
import { GraphResponse } from './graph-response/graph-response';
import { Storage } from './storage';
import { LoaderComponent } from '../../../layouts/app/loader/loader.component';
import { LoveableError } from '../loveable-error/loveable-error';
import { BubbleLoader } from '../../../layouts/app/bubble-loader/bubble-loader';

@Component({
  selector: 'app-reply-forge',
  imports: [
    FeatureHeader,
    CreditsError,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RegexReview,
    GraphResponse,
    LoaderComponent,
    LoveableError,
    BubbleLoader
  ],
  templateUrl: './reply-forge.html',
  styleUrl: './reply-forge.scss',
})
export class ReplyForge {
  private fb = inject(FormBuilder);
  private creditsService = inject(Credits)
  private httpService = inject(Http)
  private storageService = inject(Storage)
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  credits = this.creditsService.credits
  errorMessage = this.storageService.error
  graphResponse = this.storageService.graphResponse
  regexLoading = this.storageService.regexLoading
  graphLoading = this.storageService.graphLoading
  selectedFileName: string = '';
  fileError: string = '';
  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  responseData = this.storageService.responseData

  dataForm = this.fb.group({
    messagesFile: [null as File | null, Validators.required]
  });

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
      const allowedExtensions = ['.txt'];
      const fileName = file.name.toLowerCase();
      const hasValidExtension = allowedExtensions.some((ext) => fileName.endsWith(ext));

      if (!hasValidExtension) {
        this.setError('Dozwolone są tylko pliki .docx', event);
        this.dataForm.patchValue({ messagesFile: null });
        return;
      }

      // 3. Jeśli wszystko ok:
      this.selectedFileName = file.name;
      this.dataForm.patchValue({ messagesFile: file });
      this.dataForm.get('messagesFile')?.updateValueAndValidity();
    }
  }

   private setError(message: string, event: any) {
    this.fileError = message;
    this.selectedFileName = '';

    // Czyścimy input w HTML, aby można było wybrać ten sam plik ponownie
    if (event?.target) {
      event.target.value = '';
    }

    this.dataForm.patchValue({ messagesFile: null });
    this.dataForm.get('messagesFile')?.markAsTouched();
  }

  onSubmit(){
    if (this.dataForm.invalid) {
      Object.keys(this.dataForm.controls).forEach((key) => {
        this.dataForm.get(key)?.markAsTouched();
      });
      return;
    }
    this.regexLoading.set(true)

    const messagesFile = this.dataForm.get('messagesFile')?.value as File | null;

    if (!messagesFile) {
      this.fileError = 'Załączony plik nie mógł być załadowany, spróbuj ponownie';
      return;
    }

    const formData = new FormData();
    formData.append('file', messagesFile, messagesFile.name);

    this.httpService.regexCheck(formData).subscribe({
      next: (res) => {
        res.candidates = res.candidates.map(msg => ({
          ...msg,
          _uid: crypto.randomUUID()
        }));
        res.rejected = res.rejected.map(msg => ({
          ...msg,
          _uid: crypto.randomUUID()
        }));
        this.responseData.set(res)
        this.regexLoading.set(false)
      },
      error: (err) => {
        this.regexLoading.set(false)
        this.errorMessage.set(`Wystapił błąd, spróbuj pownownie później. Szczegóły w konsoli.`)
        console.log(err);          
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
}

  
