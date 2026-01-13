export const cvData = {
    "full_name": "Arkadiusz Piotrek",
    "professional_title": null,
    "summary": null,
    "contact": {
        "email": "arkadiusz.piotrek@onet.eu",
        "phone": "693 666 555",
        "linkedin": null,
        "github": null,
        "portfolio": null,
        "location": "87-100 Toruń, ul. Bygdoska 68/6"
    },
    "work_experience": [
        {
            "company": "Eurobank S.A.",
            "position": "Manager Oddziału Bankowego",
            "start_date": "05.2015",
            "end_date": null,
            "location": "Toruń",
            "responsibilities": [],
            "technologies": []
        },
        {
            "company": "Bank Gospodarki Żywnościowej",
            "position": "Dyrektor Oddziału Podległego",
            "start_date": "04.2014",
            "end_date": "05.2015",
            "location": "Toruń",
            "responsibilities": [
                "Praca z klientem detalicznym, instytucjonalnym i MSP",
                "Pozyskanie partnerów sprzedaży",
                "Powiększenie portfela oddziałowego o ok. 200 klientów ciągu 12 miesięcy",
                "Udzielanie kredytów, Lessingów i innych form finansowania",
                "Reanimacja oddziału – uzupełnienie kadry, uruchomienie sprzedaży i procesów kontrolnych, praca nad wizerunkiem placówki na rynku lokalnym, wdrożenie standardów jakościowych"
            ],
            "technologies": []
        },
        {
            "company": "CitiHandlowy/Bank Handlowy w Warszawie S.A.",
            "position": "Dyrektor Oddziałów w Toruniu i w Gdańsku",
            "start_date": "08.2008",
            "end_date": "01.2013",
            "location": "Toruń, Gdańsk",
            "responsibilities": [
                "Praca z klientem detalicznym, zamożnym i MSP",
                "Prowadzenie oddziałów banku, organizacja pracy, rozliczanie z wyników",
                "Planowanie i organizacja eventów i spotkań z klientami zarówno istniejącymi, jak i potencjalnymi"
            ],
            "technologies": []
        },
        {
            "company": "CitiHandlowy/Bank Handlowy w Warszawie S.A.",
            "position": "Dyrektor Rynku Pomorze",
            "start_date": "10.2007",
            "end_date": "08.2008",
            "location": "Pomorze Zachód",
            "responsibilities": [
                "Zarządzanie 8 oddziałami 4-6 osobowymi",
                "Zarządzanie procesem i efektywnością sprzedaży produktów kredytowych w podległym rynku"
            ],
            "technologies": []
        },
        {
            "company": "CitiHandlowy/Bank Handlowy w Warszawie S.A.",
            "position": "Kierownik Oddziału w Inowrocławiu",
            "start_date": "07.2006",
            "end_date": "10.2007",
            "location": "Inowrocław",
            "responsibilities": [
                "Zarządzanie oddziałem czteroosobowym",
                "Odpowiedzialność za wyniki sprzedażowe, jakościowe, audyt i windykację",
                "Miejsce w pierwszej trójce rankingów sprzedażowych w kraju"
            ],
            "technologies": []
        },
        {
            "company": "CitiHandlowy/Bank Handlowy w Warszawie S.A.",
            "position": "Doradca Kredytowy, Zastępca Managera",
            "start_date": "04.2005",
            "end_date": "07.2006",
            "location": null,
            "responsibilities": [],
            "technologies": []
        },
        {
            "company": "RESERVED",
            "position": "Visual Merchandising Manager",
            "start_date": "09.2004",
            "end_date": "04.2005",
            "location": "Toruń",
            "responsibilities": [
                "Zarządzanie grupą sprzedawców od strony utrzymania odpowiedniego wizerunku salonu – grupa około 15 osób"
            ],
            "technologies": []
        },
        {
            "company": "SBS S.C. Levis",
            "position": "Sprzedawca Dekorator",
            "start_date": "09.2002",
            "end_date": "10.2003",
            "location": "Toruń",
            "responsibilities": [
                "Obsługa klienta, przyjmowanie dostaw, inwentaryzacje, visual merchanising"
            ],
            "technologies": []
        },
        {
            "company": "Tres Amigos",
            "position": "Asystent kierownika klubu, kierownik klubu",
            "start_date": "06.2000",
            "end_date": "08.2002",
            "location": "Toruń",
            "responsibilities": [
                "Nadzór i kontrola nad klubem, organizacja imprez zamkniętych, organizacja promocji, sprzedaż i negocjacje usług – praca z klientem i dostawcami"
            ],
            "technologies": []
        }
    ],
    "education": [
        {
            "institution": "Wyższa Szkoła Bankowa w Toruniu",
            "degree": "inżynier",
            "field_of_study": "Zarządzanie",
            "start_date": "2016",
            "end_date": null,
            "description": null,
            "gpa": null
        },
        {
            "institution": "Uniwersytet Mikołaja Kopernika",
            "degree": "licencjat",
            "field_of_study": "Filozofia",
            "start_date": "2001",
            "end_date": "2006",
            "description": null,
            "gpa": null
        },
        {
            "institution": "Szkoła Muzyczna im. F. Chopina Warszawa",
            "degree": null,
            "field_of_study": "Wydział Jazzu kierunek saksofon",
            "start_date": "1998",
            "end_date": "2000",
            "description": null,
            "gpa": null
        }
    ],
    "technical_skills": [],
    "soft_skills": [],
    "languages": [],
    "projects": [],
    "certifications": [
        {
            "name": "Kurs Kajterski",
            "issuer": null,
            "date": null,
            "credential_id": null,
            "url": null
        }
    ],
    "interests": [
        "Muzyka jazzowa - gra na instrumencie, fizyka i teoria ewolucji, literatura, bieganie"
    ],
    "volunteer_experience": null,
    "publications": [],
    "awards": []
}

export const final_html = `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>CV - Arkadiusz Piotrek</title>
<style>
/* === PODSTAWOWA KONFIGURACJA === */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 10.5pt;
  line-height: 1.6;
  color: #334155;
  background: #ffffff;
  padding: 20mm;
  max-width: 210mm;
  margin: 0 auto;
}

/* === PDF CONFIGURATION === */
@page {
  size: A4;
  margin: 15mm 20mm;
}

/* === PRINT RULES (KRYTYCZNE) === */
@media print {
  /* Sekcje: mogą się łamać między stronami */
  .cv-section {
    page-break-inside: auto;
    margin-bottom: 20px;
  }
  /* Zapobiegaj łamaniu wewnątrz elementów */
  .cv-header,
  .section-title,
  .cv-item,
  .skill-item,
  .item-title {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  /* Trzymaj nagłówek sekcji z pierwszym elementem */
  .section-title {
    page-break-after: avoid;
    break-after: avoid;
    margin-bottom: 12px;
  }
  /* Minimum linii na początku/końcu strony */
  p,
  li {
    orphans: 2;
    widows: 2;
  }
  /* Usuń tła dla druku jeśli są zbyt ciemne */
  body {
    background: #ffffff;
  }
}

/* === FALLBACK DLA WEASYPRINT (non-@media) === */
.cv-header,
.section-title,
.cv-item,
.skill-item {
  page-break-inside: avoid;
}

.section-title {
  page-break-after: avoid;
}

/* === RESPONSIVE (mobile) === */
@media screen and (max-width: 768px) {
  body {
    font-size: 9.5pt;
  }
  .cv-header h1 {
    font-size: 24pt !important;
  }
  .section-title {
    font-size: 14pt !important;
  }
  .cv-section {
    padding: 12px 0 !important;
  }
}

/* === WŁASNE STYLE === */

/* Nagłówek */
.cv-header {
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #94a3b8;
  margin-bottom: 20px;
}
.cv-header h1 {
  font-size: 32pt;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}
.contact {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 10pt;
  color: #64748b;
}

/* Sekcje */
.cv-section {
  background-color: #f8fafc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
}
.section-title {
  font-size: 16pt;
  font-weight: 600;
  border-left: 4px solid #3b82f6;
  padding-left: 8px;
  margin-bottom: 12px;
  color: #1e293b;
}
.cv-item {
  margin-bottom: 15px;
}
.item-title {
  font-size: 14pt;
  font-weight: 600;
  margin-bottom: 4px;
  color: #334155;
}
.meta {
  font-size: 10pt;
  color: #64748b;
  margin-bottom: 8px;
}
ul {
  list-style-type: disc;
  padding-left: 20px;
  font-size: 10pt;
  color: #334155;
}
li {
  margin-bottom: 6px;
}

/* Zainteresowania */
.interests ul {
  list-style-type: disc;
  padding-left: 20px;
  font-size: 10pt;
  color: #334155;
}
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
.skill-item {
  background-color: #e2e8f0;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10pt;
  color: #1e293b;
  font-weight: 500;
}
</style>
<!-- NODE2: modern-minimal styles, PDF-ready -->
</head>
<body>
<div class="cv-container">
<header class="cv-header">
<h1>Arkadiusz Piotrek</h1>
<div class="contact">
<span>arkadiusz.piotrek@onet.eu</span>
<span>693 666 555</span>
<span>87-100 Toruń, ul. Bygdoska 68/6</span>
</div>
</header>

<!-- Sekcje: header, experience, education, certifications, interests -->

<section class="cv-section experience">
<h2>Doświadczenie</h2>
<article class="cv-item">
<h3 class="item-title">Manager Oddziału Bankowego — Eurobank S.A.</h3>
<p class="meta">Toruń | 05.2015 - obecnie</p>
</article>
<article class="cv-item">
<h3 class="item-title">Dyrektor Oddziału Podległego — Bank Gospodarki Żywnościowej</h3>
<p class="meta">Toruń | 04.2014 - 05.2015</p>
<ul>
<li>Praca z klientem detalicznym, instytucjonalnym i MSP</li>
<li>Pozyskanie partnerów sprzedaży</li>
<li>Powiększenie portfela oddziałowego o ok. 200 klientów ciągu 12 miesięcy</li>
<li>Udzielanie kredytów, Lessingów i innych form finansowania</li>
<li>Reanimacja oddziału – uzupełnienie kadry, uruchomienie sprzedaży i procesów kontrolnych, praca nad wizerunkiem placówki na rynku lokalnym, wdrożenie standardów jakościowych</li>
</ul>
</article>
<article class="cv-item">
<h3 class="item-title">Dyrektor Oddziałów w Toruniu i w Gdańsku — CitiHandlowy/Bank Handlowy w Warszawie S.A.</h3>
<p class="meta">Toruń, Gdańsk | 08.2008 - 01.2013</p>
<ul>
<li>Praca z klientem detalicznym, zamożnym i MSP</li>
<li>Prowadzenie oddziałów banku, organizacja pracy, rozliczanie z wyników</li>
<li>Planowanie i organizacja eventów i spotkań z klientami zarówno istniejącymi, jak i potencjalnymi</li>
</ul>
</article>
<article class="cv-item">
<h3 class="item-title">Dyrektor Rynku Pomorze — CitiHandlowy/Bank Handlowy w Warszawie S.A.</h3>
<p class="meta">Pomorze Zachód | 10.2007 - 08.2008</p>
<ul>
<li>Zarządzanie 8 oddziałami 4-6 osobowymi</li>
<li>Zarządzanie procesem i efektywnością sprzedaży produktów kredytowych w podległym rynku</li>
</ul>
</article>
<article class="cv-item">
<h3 class="item-title">Kierownik Oddziału w Inowrocławiu — CitiHandlowy/Bank Handlowy w Warszawie S.A.</h3>
<p class="meta">Inowrocław | 07.2006 - 10.2007</p>
<ul>
<li>Zarządzanie oddziałem czteroosobowym</li>
<li>Odpowiedzialność za wyniki sprzedażowe, jakościowe, audyt i windykację</li>
<li>Miejsce w pierwszej trójce rankingów sprzedażowych w kraju</li>
</ul>
</article>
<article class="cv-item">
<h3 class="item-title">Zastępca Managera / Doradca Kredytowy — CitiHandlowy/Bank Handlowy w Warszawie S.A.</h3>
<p class="meta">brak danych</p>
</article>
<article class="cv-item">
<h3 class="item-title">Visual Merchandising Manager — RESERVED</h3>
<p class="meta">Toruń | 09.2004 - 04.2005</p>
<ul>
<li>Zarządzanie grupą sprzedawców od strony utrzymania odpowiedniego wizerunku salonu – grupa około 15 osób</li>
</ul>
</article>
<article class="cv-item">
<h3 class="item-title">Sprzedawca Dekorator — SBS S.C. Levis</h3>
<p class="meta">Toruń | 09.2002 - 10.2003</p>
<ul>
<li>Obsługa klienta, przyjmowanie dostaw, inwentaryzacje, visual merchanising</li>
</ul>
</article>
<article class="cv-item">
<h3 class="item-title">Asystent kierownika klubu / Kierownik klubu — Tres Amigos</h3>
<p class="meta">Toruń | 06.2000 - 08.2002</p>
<ul>
<li>Nadzór i kontrola nad klubem, organizacja imprez zamkniętych, organizacja promocji, sprzedaż i negocjacje usług – praca z klientem i dostawcami</li>
</ul>
</article>
</section>

<section class="cv-section education">
<h2>Edukacja</h2>
<article class="cv-item">
<h3 class="item-title">Inżynier — Zarządzanie</h3>
<p class="meta">Wyższa Szkoła Bankowa w Toruniu | 2016 - brak danych</p>
</article>
<article class="cv-item">
<h3 class="item-title">Licencjat — Filozofia</h3>
<p class="meta">Uniwersytet Mikołaja Kopernika | 2001 - 2006</p>
</article>
<article class="cv-item">
<h3 class="item-title">Wydział Jazzu kierunek saksofon — Szkoła Muzyczna im. F. Chopina Warszawa</h3>
<p class="meta">1998 - 2000</p>
</article>
</section>

<section class="cv-section certifications">
<h2>Certyfikaty</h2>
<article class="cv-item">
<h3 class="item-title">Kurs Kasjerski</h3>
</article>
</section>

<section class="cv-section interests">
<h2>Zainteresowania</h2>
<ul>
<li>Muzyka jazzowa - gra na instrumencie, fizyka i teoria ewolucji, literatura, bieganie</li>
</ul>
</section>
</div>
</body>
</html>`