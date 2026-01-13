declare module 'bootstrap' {
  export class Offcanvas {
    constructor(element: Element);
    show(): void;
    hide(): void;
    toggle(): void;

    static getInstance(element: Element): Offcanvas | null;
    static getOrCreateInstance(element: Element): Offcanvas;
  }
}
