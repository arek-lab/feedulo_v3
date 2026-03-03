import { Component, inject, OnDestroy } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatChipsModule } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";
import { Storage } from '../storage';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-graph-response',
  imports: [
    MatIconModule, 
    MatTabsModule, 
    MatChipsModule, 
    MatListModule,
    ClipboardModule,
    MatButtonModule
  ],
  templateUrl: './graph-response.html',
  styleUrl: './graph-response.scss',
})
export class GraphResponse  implements OnDestroy{
  private storageService = inject(Storage)
  graphResponse = this.storageService.graphResponse
  regexResponse = this.storageService.responseData

  onNew() {
    this.graphResponse.set(null)
    this.regexResponse.set(null)
  }

  ngOnDestroy(): void {
    this.onNew()
  }
}
