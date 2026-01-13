import { Component, input } from '@angular/core';

@Component({
  selector: 'app-feature-header',
  imports: [],
  templateUrl: './feature-header.html',
  styleUrl: './feature-header.scss',
})
export class FeatureHeader {
  title = input.required()
  description = input.required()

}
