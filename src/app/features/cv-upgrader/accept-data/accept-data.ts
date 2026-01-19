import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../cv-upgrader/http.service';
import { SseService } from '../../cv-upgrader/sse.service';
import { StorageService } from '../../cv-upgrader/storage.service';
import { CVData } from '../../cv-upgrader/cv-upgrader.model';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { final_html } from './mock';

@Component({
  selector: 'app-accept-data',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accept-data.html',
  styleUrl: './accept-data.scss',
})
export class AcceptData {
  cvForm!: FormGroup;

  private fb = inject(FormBuilder);
  private httpService = inject(HttpService);
  private sseService = inject(SseService);
  private storageService = inject(StorageService);
  isLoading = this.storageService.isLoading
  acceptDataCompleted = this.storageService.acceptDataCompleted
  finalHtml = this.storageService.finalHtml();
  private sanitizer = inject(DomSanitizer);
  html = this.sanitizer.bypassSecurityTrustHtml(final_html);

  ngOnInit() {
    this.cvForm = this.createForm();
    this.loadCVData();
  }
  accordion = viewChild.required(MatAccordion);
  step = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update((i) => i + 1);
  }

  prevStep() {
    this.step.update((i) => i - 1);
  }

  createForm(): FormGroup {
    return this.fb.group({
      full_name: [''],
      professional_title: [''],
      summary: [''],
      contact: this.fb.group({
        email: [''],
        phone: [''],
        linkedin: [''],
        github: [''],
        portfolio: [''],
        location: [''],
      }),
      work_experience: this.fb.array([]),
      education: this.fb.array([]),
      technical_skills: [[]],
      soft_skills: [[]],
      languages: this.fb.array([]),
      projects: this.fb.array([]),
      certifications: this.fb.array([]),
      interests: [[]],
      volunteer_experience: [''],
      publications: [[]],
      awards: [[]],
    });
  }
  get workExperience(): FormArray {
    return this.cvForm.get('work_experience') as FormArray;
  }

  get education(): FormArray {
    return this.cvForm.get('education') as FormArray;
  }

  get languages(): FormArray {
    return this.cvForm.get('languages') as FormArray;
  }

  get projects(): FormArray {
    return this.cvForm.get('projects') as FormArray;
  }

  get certifications(): FormArray {
    return this.cvForm.get('certifications') as FormArray;
  }

  loadCVData() {
    this.populateForm(this.sseService?.stream?.status()?.hitl_data?.cv_data as CVData);
  }

  populateForm(data: CVData): void {
    // Dane podstawowe
    this.workExperience.clear();
    this.education.clear();
    this.languages.clear();
    this.projects.clear();
    this.certifications.clear();
    this.cvForm.patchValue({
      full_name: data.full_name,
      professional_title: data.professional_title,
      summary: data.summary,
      contact: data.contact,
      technical_skills: data.technical_skills || [],
      soft_skills: data.soft_skills || [],
      interests: data.interests || [],
      volunteer_experience: data.volunteer_experience,
      publications: data.publications || [],
      awards: data.awards || [],
    });

    // Doświadczenie zawodowe
    data.work_experience?.forEach((exp) => {
      this.workExperience.push(
        this.fb.group({
          company: [exp.company, Validators.required],
          position: [exp.position, Validators.required],
          start_date: [exp.start_date],
          end_date: [exp.end_date],
          location: [exp.location],
          responsibilities: [exp.responsibilities || []],
          technologies: [exp.technologies || []],
        })
      );
    });

    // Wykształcenie
    data.education?.forEach((edu) => {
      this.education.push(
        this.fb.group({
          institution: [edu.institution, Validators.required],
          degree: [edu.degree],
          field_of_study: [edu.field_of_study],
          start_date: [edu.start_date],
          end_date: [edu.end_date],
          description: [edu.description],
          gpa: [edu.gpa],
        })
      );
    });

    // Języki
    data.languages?.forEach((lang) => {
      this.languages.push(
        this.fb.group({
          language: [lang.language, Validators.required],
          proficiency: [lang.proficiency],
        })
      );
    });

    // Projekty
    data.projects?.forEach((proj) => {
      this.projects.push(
        this.fb.group({
          name: [proj.name, Validators.required],
          description: [proj.description, Validators.required],
          technologies: [proj.technologies || []],
          url: [proj.url],
          role: [proj.role],
        })
      );
    });

    // Certyfikaty
    data.certifications?.forEach((cert) => {
      this.certifications.push(
        this.fb.group({
          name: [cert.name, Validators.required],
          issuer: [cert.issuer],
          date: [cert.date],
          credential_id: [cert.credential_id],
          url: [cert.url],
        })
      );
    });
  }

  addWorkExperience(): void {
    this.workExperience.push(
      this.fb.group({
        company: ['', Validators.required],
        position: ['', Validators.required],
        start_date: [''],
        end_date: [''],
        location: [''],
        responsibilities: [[]],
        technologies: [[]],
      })
    );
  }

  removeWorkExperience(index: number): void {
    this.workExperience.removeAt(index);
  }

  addEducation(): void {
    this.education.push(
      this.fb.group({
        institution: ['', Validators.required],
        degree: [''],
        field_of_study: [''],
        start_date: [''],
        end_date: [''],
        description: [''],
        gpa: [''],
      })
    );
  }

  removeEducation(index: number): void {
    this.education.removeAt(index);
  }

  addLanguage(): void {
    this.languages.push(
      this.fb.group({
        language: ['', Validators.required],
        proficiency: [''],
      })
    );
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  addProject(): void {
    this.projects.push(
      this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        technologies: [[]],
        url: [''],
        role: [''],
      })
    );
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
  }

  addCertification(): void {
    this.certifications.push(
      this.fb.group({
        name: ['', Validators.required],
        issuer: [''],
        date: [''],
        credential_id: [''],
        url: [''],
      })
    );
  }

  removeCertification(index: number): void {
    this.certifications.removeAt(index);
  }

  updateArrayField(formGroup: any, fieldName: string, event: any): void {
    const value = event.target.value;
    const array = value
      ? value
          .split(',')
          .map((s: string) => s.trim())
          .filter((s: string) => s)
      : [];
    formGroup.get(fieldName)?.setValue(array);
  }

  updateMainArrayField(fieldName: string, event: any): void {
    const value = event.target.value;
    const array = value
      ? value
          .split(',')
          .map((s: string) => s.trim())
          .filter((s: string) => s)
      : [];
    this.cvForm.get(fieldName)?.setValue(array);
  }

  onSubmit(): void {
    if (this.cvForm.valid) {
      this.isLoading.set(true);
      const formData = this.cvForm.value;

      this.httpService
        .submitHitlFeedback(this.storageService.threadId(), {
          hitl_type: 'acceptation',
          accepted_cv_data: formData,
        })
        .subscribe({
          next: (res) => {
            this.acceptDataCompleted.set(true)
          },
          error: (err) => {
            this.storageService.upgraderError.set(
              'Wystapił błąd. Spróbuj ponownie.'
            )
            this.isLoading.set(false)
          },
        });
    }
  }

  onCancel(): void {
    if (confirm('Czy na pewno chcesz anulować? Niezapisane zmiany zostaną utracone.')) {
      this.loadCVData(); // Przeładuj dane
    }
  }
}
