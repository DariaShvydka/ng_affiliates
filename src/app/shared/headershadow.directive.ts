import { Directive, HostBinding, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appHeadershadow]'
})
export class HeadershadowDirective implements OnInit, OnDestroy {
  @HostBinding('class.selected') selected: boolean;

  constructor() { }

  ngOnInit() {
    if (typeof window.scrollY !== undefined) {
      window.addEventListener('scroll', () => this._checkScroll());
    }

  }

  ngOnDestroy() {
    if (typeof window.scrollY !== undefined) {
      window.removeEventListener('scroll', () => this._checkScroll());
    }
  }

  private _checkScroll() {
    if (typeof window.scrollY !== undefined) {
      this.selected = (window.scrollY > 70);
    }
  }
}
