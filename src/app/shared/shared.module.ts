import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { LottieAnimationViewModule } from 'ng-lottie';
import { HeadershadowDirective } from './headershadow.directive';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LottieAnimationViewModule.forRoot(),
    ScrollToModule.forRoot()
  ],
  declarations: [FooterComponent, HeaderComponent, LoaderComponent, HeadershadowDirective],
  exports: [FooterComponent, HeaderComponent, LoaderComponent],
})
export class SharedModule {
}
