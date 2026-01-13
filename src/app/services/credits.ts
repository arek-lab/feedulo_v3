import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Credits {
  credits = signal<number>(0)
}
