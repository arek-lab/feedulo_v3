import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListModule, MatNavList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { map, shareReplay } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Credits } from '../../../services/credits';

@Component({
  selector: 'app-app-layout',
  imports: [
    MatSidenavModule,
    MatIconModule,
    RouterOutlet,
    MatToolbarModule,
    MatNavList,
    MatListItem,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    AsyncPipe,
    MatIconModule
  ],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayout {
  private authService = inject(AuthService);
  private breakpointObserver = inject(BreakpointObserver);
  private creditsService = inject(Credits)

  user = toSignal(this.authService.currentUser$);
  credits = this.creditsService.credits

  private breakpoint$ = this.breakpointObserver
    .observe(['(max-width: 599px)', '(min-width: 960px)'])
    .pipe(shareReplay()); 

  isMobile$ = this.breakpoint$.pipe(map((result) => result.breakpoints['(max-width: 599px)']));

  isDesktop$ = this.breakpoint$.pipe(map((result) => result.breakpoints['(min-width: 960px)']));

  logout = () => {
    this.authService.logout();
  };
}
