import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    // RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatTabsModule
],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
}
