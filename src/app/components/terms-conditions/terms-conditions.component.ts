import { Component, Renderer2, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnDestroy {

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'body__terms-conditions');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'body__terms-conditions');
  }

}
