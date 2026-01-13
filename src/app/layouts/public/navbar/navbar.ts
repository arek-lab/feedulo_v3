import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);
  @ViewChild('navbarCollapse', { static: true }) navbarCollapse!: ElementRef;
  user = this.authService.currentUser$;

  closeMenu() {
    const collapseElement = this.navbarCollapse.nativeElement;
    if (collapseElement.classList.contains('show')) {
      collapseElement.classList.remove('show');
    }
  }

  logout() {
    this.authService.logout();
  }

  scrollTo(place: string): void {
    const currentUrl = this.router.url;

    if (currentUrl === '/' || currentUrl.startsWith('/home')) {
      const scrollElement = document.querySelector(`#${place}`);
      if (scrollElement) {
        scrollElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        this.closeMenu();
      }
    } else {
      this.router.navigate(['/home'], { fragment: place });
      this.closeMenu();
    }
  }
}
