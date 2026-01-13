import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, LoginResponse, User } from '../auth.service';
import { LoaderComponent } from '../../layouts/app/loader/loader.component';



@Component({
  selector: 'app-auth',
  imports: [
    ReactiveFormsModule, 
    RouterLink,
    LoaderComponent
  
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  errorMessage = signal<string | null>(null);
  type = input();
  isLoading = signal(false);
  private router = inject(Router);
  private authService = inject(AuthService);
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  clearErrorMessage() {
    this.errorMessage.set(null);
  }

  onSubmit() {
    if (this.type() === 'register' && this.authForm.invalid) return;
    if (
      this.type() === 'login' &&
      (this.authForm.controls.email.invalid || this.authForm.controls.password.invalid)
    )
      return;
    this.isLoading.set(true);
    const { email, password } = this.authForm.value;
    let authObs!: Observable<LoginResponse | User>;

    this.type() === 'login'
      ? (authObs = this.authService.login({
          email: email!,
          password: password!,
        }))
      : (authObs = this.authService.register({
          email: email!,
          password: password!,
        }));

    authObs.subscribe({
      next: (resData) => {
        this.isLoading.set(false);
        if (this.type() === 'login') {
          this.router.navigate(['app']);
        } else {
          this.errorMessage.set(
            'Konto zostało utworzone. Skontaktuj się z administratorem w celu aktywacji.'
          );
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        this.authForm.reset();
        this.errorMessage.set('Logowanie nieudane.Sprawdź dane oraz połączenie z internetem i spróbuj ponownie.');
      },
    });
    this.authForm.reset();
  }
}
