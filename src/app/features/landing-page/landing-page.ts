import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from '../../layouts/public/navbar/navbar';
import { phoneNumberValidator } from './validators';

@Component({
  selector: 'app-landing-page',
  imports: [ReactiveFormsModule, CommonModule, Navbar],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  @ViewChild('featuresSection') featuresSection!: ElementRef;
  @ViewChild('home') home!: ElementRef;
  @ViewChild('contact') contact!: ElementRef;
  showConfirm = signal<string | null>(null);
  date = new Date().getFullYear();

  contactForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', phoneNumberValidator()),
    message: new FormControl('', { validators: [Validators.required, Validators.minLength(10)] }),
  });

  scrollTo(place: string) {
    let element: ElementRef;
    switch (place) {
      case 'features':
        element = this.featuresSection;
        break;
      case 'home':
        element = this.home;
        break;
      case 'contact':
        element = this.contact;
    }
    element!.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  onSubmit() {
    const customerQuery = { ...this.contactForm.value };
    this.showConfirm.set('Wysłano poprawnie!');
    setTimeout(() => {
      this.showConfirm.set(null);
      this.contactForm.reset();
      this.scrollTo('home');
    }, 1500);
  }
}
