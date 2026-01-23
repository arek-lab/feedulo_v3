import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public/public-layout/public-layout';
import { LandingPage } from './features/landing-page/landing-page';
import { AppLayout } from './layouts/app/app-layout/app-layout';
import { Home } from './features/home/home';
import { Feedbacks } from './features/feedbacks/feedbacks';
import { EmailGenerator } from './features/email-generator/email-generator';
import { CvUpgrader } from './features/cv-upgrader/cv-upgrader';
import { Auth } from './auth/auth/auth';
import { authGuard } from './auth/auth.guard';
import { TextCraft } from './features/text-craft/text-craft';

export const routes: Routes = [
  // ===== PUBLIC =====
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: LandingPage },
      { path: 'auth/:type', component: Auth },
    ],
  },

  // ===== APP =====
  {
    path: 'app',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      { path: 'feedbacks', component: Feedbacks },
      { path: 'email-generator', component: EmailGenerator },
      { path: 'cv-upgrader', component: CvUpgrader },
      { path: 'text-craft', component: TextCraft }
    ],
  },
  { path: '**', redirectTo: '' },
];