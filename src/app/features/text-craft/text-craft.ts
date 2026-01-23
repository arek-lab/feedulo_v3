import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subcategory, CATEGORY_STRUCTURE, LLMResponse, audienceTypes, platformAdaptationTypes, UserInput, Intent } from './model';
import { Http } from './http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule, PercentPipe } from '@angular/common';
import { CreditsError } from '../../layouts/app/credits-error/credits-error';
import { FeatureHeader } from '../../layouts/app/feature-header/feature-header';
import { Credits } from '../../services/credits';

@Component({
  selector: 'app-text-craft',
  imports: [
    ReactiveFormsModule,
    FeatureHeader,
    CreditsError,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatRadioModule,
    CommonModule,
    PercentPipe
    
  ],
  templateUrl: './text-craft.html',
  styleUrl: './text-craft.scss',
})
export class TextCraft {
  private fb = inject(FormBuilder)
  private httpService = inject(Http)
  private creditsService = inject(Credits)
   @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  credits = this.creditsService.credits
  isLoading = signal(false)
  copied = signal(false);
  responseData = signal<LLMResponse | null>(null);
  currentSubcategory = signal<Subcategory | null>(null)
  audienceTypes = audienceTypes
  platformAdaptationTypes = platformAdaptationTypes
  selectedPlatform = signal<string | null>(null)
  currentUserValue = signal<UserInput | null>(null)

  categories = Object.keys(CATEGORY_STRUCTURE) as Intent[];
  categoryMap = CATEGORY_STRUCTURE;
  dataForm = this.fb.group({
      original_text: ['', [Validators.required]],
      intent: [Intent.REWRITE, [Validators.required]],
      subcategory: [Subcategory.GENERAL, [Validators.required]],
      options: ['']
    });

  ngOnInit() {
  this.dataForm.get('category')?.valueChanges.subscribe((newCategory) => {
    if (newCategory) {
      this.updateSubcategory(newCategory as Intent);
    }
  });
}

  updateSubcategory(category: Intent) {
    const subs = this.categoryMap[category]?.subcategories;
    this.dataForm.get('options')?.setValue('')
    if (subs && subs.length > 0) {
      // Ustawiamy wartość pierwszej subkategorii z listy
      this.dataForm.get('subcategory')?.setValue(subs[0].value);
      
    }
  }

  get availableSubcategories() {
    const selectedCategory = this.dataForm.get('intent')?.value as Intent;
    return this.categoryMap[selectedCategory]?.subcategories || [];
  }

  setSubcategorySignal(subcategory: Subcategory){
    this.currentSubcategory.set(subcategory)   
    this.dataForm.get('options')?.setValue('')
  }
  selectPlatform(platform: string){
    this.dataForm.get('options')?.setValue(platform);
    this.selectedPlatform.set(platform)
  }

  onSubmit(){
    if (this.dataForm.invalid || this.credits() < 1 ) return;

    const { intent, subcategory, original_text, options } = this.dataForm.getRawValue();

    const userValue: UserInput = {
      intent: intent!,
      subcategory: subcategory!,
      original_text: original_text!,
      options: this.buildOptionsObject(subcategory!, options)
    };
    this.currentUserValue.set(userValue)


    this.isLoading.set(true);  
    
    this.httpService.editText(userValue).subscribe({
      next: res => {
        this.isLoading.set(false);
        this.responseData.set(res);
        this.dataForm.reset();
        this.formDirective.resetForm();
        this.credits.set(this.responseData()?.credits!)
        
      },
      error: err => {
        this.isLoading.set(false);
        this.responseData.set({
          "text": 'Wystapil błąd, spróbuj ponownie.',
          "confidence": 0,
          'credits': this.credits()
        })
        
      }
    })    
  }

  private buildOptionsObject(subcategory: Subcategory, value: string | null): Record<string, string> {
  const validSubcategories = [
    Subcategory.AUDIENCE_ADAPTATION, 
    Subcategory.PLATFORM_ADAPTATION
  ];
  const OPTIONS_KEYS: Record<string, string> = {
    [Subcategory.AUDIENCE_ADAPTATION]: 'target_audience',
    [Subcategory.PLATFORM_ADAPTATION]: 'target_platform'
  };
  
  return value && validSubcategories.includes(subcategory)
    ? { [OPTIONS_KEYS[subcategory]]: value }
    : {};
}

  copyToClipboard() {
    navigator.clipboard
      .writeText(this.responseData()?.text as string)
      .then(() => this.copied.set(true))
      .catch((err) => alert('Nie udało się skopiować'));
  }

  startNewQuery() {
    this.responseData.set(null);
    this.selectedPlatform.set(null)
    this.currentUserValue.set(null)
    this.dataForm.get("intent")?.setValue(Intent.REWRITE)
    this.updateSubcategory(Intent.REWRITE)
  }

  editOriginal(){
    this.responseData.set(null);
    const { intent, subcategory, original_text, options } = this.currentUserValue()!
    this.dataForm.get("intent")?.setValue(intent)
    this.dataForm.get("subcategory")?.setValue(subcategory)
    this.dataForm.get("original_text")?.setValue(original_text)
  }

  editProposal(){
    const { intent, subcategory, original_text, options } = this.currentUserValue()!
    this.dataForm.get("intent")?.setValue(intent)
    this.dataForm.get("subcategory")?.setValue(subcategory)
    this.dataForm.get("original_text")?.setValue(this.responseData()?.text!)
    this.responseData.set(null);
  }
}
