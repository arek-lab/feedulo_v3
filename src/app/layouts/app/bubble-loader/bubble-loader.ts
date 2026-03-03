import {
  Component,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  NgZone,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Shape {
  el: HTMLDivElement;
  y: number;
  hit: boolean;
}

const MAX_SCORE = 100;
const SPAWN_MS  = 900;
const SPEED_PX  = 1.2;

const DEFS = [
  { r: '50%',  g: 'radial-gradient(circle at 35% 35%,#e0e8ff,#a5b4fc)', s: 46 },
  { r: '50%',  g: 'radial-gradient(circle at 35% 35%,#fde8d8,#fb923c)', s: 42 },
  { r: '10px', g: 'linear-gradient(135deg,#d1fae5,#6ee7b7)',             s: 40 },
  { r: '50%',  g: 'radial-gradient(circle at 35% 35%,#fce7f3,#f9a8d4)', s: 44 },
  { r: '8px',  g: 'linear-gradient(135deg,#e0f2fe,#7dd3fc)',             s: 38 },
  { r: '50%',  g: 'radial-gradient(circle at 35% 35%,#fef9c3,#fde047)', s: 44 },
  { r: '14px', g: 'linear-gradient(135deg,#ede9fe,#c4b5fd)',             s: 40 },
  { r: '50%',  g: 'radial-gradient(circle at 35% 35%,#dcfce7,#4ade80)', s: 42 },
];



@Component({
  selector: 'app-bubble-loader',
  imports: [MatProgressSpinnerModule],
  templateUrl: './bubble-loader.html',
  styleUrl: './bubble-loader.scss',
})
export class BubbleLoader {
  @Output() finished = new EventEmitter<void>();
  @ViewChild('arena') arenaRef!: ElementRef<HTMLDivElement>;
  @ViewChild('track') trackRef!: ElementRef<HTMLDivElement>;
  @ViewChild('progressFill') fillRef!: ElementRef<HTMLDivElement>;
  @ViewChild('scoreEl') scoreEl!: ElementRef<HTMLSpanElement>;

  private shapes: Shape[] = [];
  private spawnTimer!: ReturnType<typeof setInterval>;
  private rafId!: number;
  private score = 0;
  gameOver = false;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    // wszystko poza Angular zone — zero change detection na każdej klatce
    this.zone.runOutsideAngular(() => {
      this.spawnTimer = setInterval(() => this.spawn(), SPAWN_MS);
      this.spawn();
      this.rafId = requestAnimationFrame(() => this.loop());
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.spawnTimer);
    cancelAnimationFrame(this.rafId);
  }

  private spawn(): void {
    if (this.gameOver) return;

    const def    = DEFS[Math.floor(Math.random() * DEFS.length)];
    const arenaW = this.arenaRef.nativeElement.clientWidth;
    const x      = def.s + Math.random() * (arenaW - def.s * 2);

    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;
      width:${def.s}px;
      height:${def.s}px;
      border-radius:${def.r};
      background:${def.g};
      left:${x}px;
      top:-${def.s}px;
      box-shadow:0 4px 16px rgba(0,0,0,0.12),inset 0 1px 0 rgba(255,255,255,0.7);
      cursor:pointer;
    `;
    this.arenaRef.nativeElement.appendChild(el);

    const obj: Shape = { el, y: -def.s, hit: false };
    this.shapes.push(obj);

    // listener poza zone — pointerdown jest natychmiastowy, bez opóźnień
    el.addEventListener('pointerdown', (e: PointerEvent) => {
      e.stopPropagation();
      if (obj.hit || this.gameOver) return;
      obj.hit = true;
      this.shapes = this.shapes.filter(s => s !== obj);

      el.style.transition = 'transform .15s, opacity .15s';
      el.style.transform  = 'scale(1.7)';
      el.style.opacity    = '0';
      setTimeout(() => el.remove(), 160);

      this.score++;
      this.updateUI();
      if (this.score >= MAX_SCORE) this.end();
    });
  }

  private loop(): void {
    if (this.gameOver) return;

    const arenaH = this.arenaRef.nativeElement.clientHeight;

    for (const s of this.shapes) {
      if (s.hit) continue;
      s.y += SPEED_PX;
      s.el.style.top = s.y + 'px';
    }

    const gone = this.shapes.filter(s => !s.hit && s.y > arenaH);
    gone.forEach(s => s.el.remove());
    this.shapes = this.shapes.filter(s => s.hit || s.y <= arenaH);

    this.rafId = requestAnimationFrame(() => this.loop());
  }

  private updateUI(): void {
    this.scoreEl.nativeElement.textContent = `${this.score} / ${MAX_SCORE}`;
    this.fillRef.nativeElement.style.width =
      `${Math.min(this.score / MAX_SCORE * 100, 100)}%`;
  }

  private end(): void {
    this.gameOver = true;
    clearInterval(this.spawnTimer);
    cancelAnimationFrame(this.rafId);
    this.shapes.forEach(s => s.el.remove());
    this.shapes = [];

    // progress bar → indeterminate
    this.trackRef.nativeElement.classList.add('indeterminate');

    // wróć do Angular zone żeby emit dotarł do rodzica
    this.zone.run(() => this.finished.emit());
  }
}
