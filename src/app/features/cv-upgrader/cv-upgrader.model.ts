export interface GraphStartResponse {
  thread_id: string;
  status?: string;
  message: string;
  credits: number
}

export interface CVData {
  full_name?: string;
  professional_title?: string;
  summary?: string;
  contact: {
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    location?: string;
  };
  work_experience: Array<{
    company: string;
    position: string;
    start_date?: string;
    end_date?: string;
    location?: string;
    responsibilities: string[];
    technologies: string[];
  }>;
  education: Array<{
    institution: string;
    degree?: string;
    field_of_study?: string;
    start_date?: string;
    end_date?: string;
    description?: string;
    gpa?: string;
  }>;
  technical_skills: string[];
  soft_skills: string[];
  languages: Array<{
    language: string;
    proficiency?: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    role?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer?: string;
    date?: string;
    credential_id?: string;
    url?: string;
  }>;
  interests: string[];
  volunteer_experience?: string;
  publications: string[];
  awards: string[];
}
