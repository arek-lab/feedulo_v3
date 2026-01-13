import { Component, effect, inject } from '@angular/core';
import { SseService, StatusUpdate } from '../sse.service';
import { StorageService } from '../storage.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CvInfo } from '../cv-info/cv-info';
import { AcceptData } from '../accept-data/accept-data';

@Component({
  selector: 'app-additional-info',
  imports: [
    MatProgressBarModule,
    CvInfo,
    AcceptData
  ],
  templateUrl: './additional-info.html',
  styleUrl: './additional-info.scss',
})
export class AdditionalInfo {
  private sse = inject(SseService);
  private storageService = inject(StorageService);
  stream = this.sse.stream;
  isLoading = this.storageService.isLoading;

  constructor() {
    effect(
      () => {
        const status = this.stream!.status()?.status;
        const hitlType = this.stream!.status()?.hitl_type;

        if (status !== 'completed' && !hitlType) this.isLoading.set(true);
        if (status !== 'completed' && hitlType) this.isLoading.set(false);
      }
    );
  }

  graphStatus: Record<StatusUpdate['status'], string> = {
    running: 'Pracujemy nad Twoim CV...',
    waiting_hitl: 'Czekamy na Twoje działanie...',
    completed: 'Twoje nowe CV jest gotowe!',
    error: 'Niestety wystpąpił błąd. Spróbuj ponownie za chwilę.',
    unknown: 'Rozpoczynamy prace...',
  };

  nextNode: Record<StatusUpdate['next_node'], string> = {
    extract_cv: 'Pobranie danych z CV',
    job_description: 'Przygotowanie opisu stanowiska',
    compare_cv_to_offer: 'Porównanie danych CV i oferty pracy',
    'human review': 'Feedback użytkownika',
    'collect all data': 'Edycja lub akceptacja danych',
    'generate cv structure': 'Generowanie struktury CV',
    'add style and optymize': 'Dodanie styli wizualnych',
    tools: 'Narzędzia internetowe',
  };
}
