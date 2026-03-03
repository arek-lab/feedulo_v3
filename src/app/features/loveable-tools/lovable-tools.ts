import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BubbleLoader } from '../../layouts/app/bubble-loader/bubble-loader';

@Component({
  selector: 'app-lovable-tools',
  imports: [
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './lovable-tools.html',
  styleUrl: './lovable-tools.scss',
})
export class LovableTools {

}
