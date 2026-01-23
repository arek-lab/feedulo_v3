export enum Intent {
  REWRITE = 'rewrite_flow',
  SHORTEN = 'shorten_flow',
  SIMPLIFY = 'simplify_flow'
}

export enum Subcategory {
  // Rewrite
  FORMAL_TO_INFORMAL = 'formal_to_informal',
  INFORMAL_TO_FORMAL = 'informal_to_formal',
  IMPROVE_CLARITY = 'improve_clarity',
  AUDIENCE_ADAPTATION = 'audience_adaptation',
  CREATIVE_REPHRASE = 'creative_rephrase',
  PLATFORM_ADAPTATION = 'platform_adaptation',
  EXPAND = 'expand',
  MAKE_PERSUASIVE = 'make_persuasive',
  PASSIVE_TO_ACTIVE = 'passive_to_active',
  GENERAL = 'general',

  // Shorten
  BRIEF_SUMMARY = 'brief_summary',
  REMOVE_FLUFF = 'remove_fluff',
  KEY_POINTS = 'key_points',
  EXECUTIVE_SUMMARY = 'executive_summary',

  // Simplify
  REDUCE_JARGON = 'reduce_jargon',
  SHORTER_SENTENCES = 'shorter_sentences',
  EVERYDAY_LANGUAGE = 'everyday_language',
  EXPLAIN_CONCEPTS = 'explain_concepts',
  LOWER_READING_LEVEL = 'lower_reading_level'
}

export interface UserInput {
  intent: Intent;
  subcategory: Subcategory;
  original_text: string;
  options: Record<string, string> | null
}

export interface LLMResponse {
  text: string;
  confidence: number;
  credits: number
}

export const CATEGORY_STRUCTURE: Record<Intent, { label: string, subcategories: { value: Subcategory, label: string }[] }> = {
  [Intent.REWRITE]: {
    label: 'Przepisywanie i Styl',
    subcategories: [
      { value: Subcategory.FORMAL_TO_INFORMAL, label: 'Z formalnego na potoczny' },
      { value: Subcategory.INFORMAL_TO_FORMAL, label: 'Z potocznego na formalny' },
      { value: Subcategory.IMPROVE_CLARITY, label: 'Popraw czytelność' },
      { value: Subcategory.AUDIENCE_ADAPTATION, label: 'Dostosuj do odbiorcy' },
      { value: Subcategory.PLATFORM_ADAPTATION, label: 'Dostosuj do platformy' },
      { value: Subcategory.GENERAL, label: 'Ogólne poprawki' }
      // Dodaj resztę według potrzeb
    ]
  },
  [Intent.SHORTEN]: {
    label: 'Skracanie tekstu',
    subcategories: [
      { value: Subcategory.BRIEF_SUMMARY, label: 'Krótkie streszczenie' },
      { value: Subcategory.REMOVE_FLUFF, label: 'Usuń lanie wody' },
      { value: Subcategory.KEY_POINTS, label: 'Same konkrety (punkty)' },
      { value: Subcategory.EXECUTIVE_SUMMARY, label: 'Podsumowanie menedżerskie' }
    ]
  },
  [Intent.SIMPLIFY]: {
    label: 'Upraszczanie',
    subcategories: [
      { value: Subcategory.REDUCE_JARGON, label: 'Usuń żargon techniczny' },
      { value: Subcategory.EVERYDAY_LANGUAGE, label: 'Język potoczny' },
      { value: Subcategory.LOWER_READING_LEVEL, label: 'Wyjaśnij jak dziecku' }
    ]
  }
};

export const audienceTypes = [
  { value: 'expert', label: 'Eksperci i specjaliści' },
  { value: 'layman', label: 'Laicy (osoby spoza branży)' },
  { value: 'executive', label: 'Zarząd i kadra zarządzająca' },
  { value: 'client', label: 'Klienci (B2B/B2C)' },
  { value: 'colleague', label: 'Współpracownicy (zespół)' },
  { value: 'student', label: 'Uczniowie/Studenci' },
  { value: 'child', label: 'Dzieci (prosty język)' },
  { value: 'general', label: 'Odbiorca ogólny' }
];

export const platformAdaptationTypes = [
  { 
    value: 'linkedin', 
    label: 'bi-linkedin', 
    description: 'Post profesjonalny / biznesowy' 
  },
  { 
    value: 'twitter_x', 
    label: 'bi-twitter-x', 
    description: 'Krótki, dynamiczny wpis (X)' 
  },
  { 
    value: 'facebook', 
    label: 'bi-facebook', 
    description: 'Post społecznościowy / grupy' 
  },
  { 
    value: 'instagram', 
    label: 'bi-instagram', 
    description: 'Lekki styl z emoji i hashtagami' 
  },
  { 
    value: 'threads', 
    label: 'bi-threads', 
    description: 'Wątek dyskusyjny' 
  },
  { 
    value: 'reddit', 
    label: 'bi-reddit', 
    description: 'Post na forum (bezpośredni styl)' 
  },
  { 
    value: 'email', 
    label: 'bi-envelope-at', 
    description: 'Formalna wiadomość e-mail' 
  },
  { 
    value: 'slack_discord', 
    label: 'bi-chat-dots', 
    description: 'Komunikat na czat (Slack/Discord)' 
  },
  { 
    value: 'medium_blog', 
    label: 'bi-medium', 
    description: 'Artykuł lub wpis na bloga' 
  },
  { 
    value: 'tiktok_caption', 
    label: 'bi-tiktok', 
    description: 'Krótki opis do wideo (hooki)' 
  }
];
