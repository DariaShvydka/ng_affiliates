import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainComponent} from './components/main/main.component';

import {TermsConditionsComponent} from './components/terms-conditions/terms-conditions.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {PasswordResetComponent} from './components/password-reset/password-reset.component';
import {ActivateComponent} from './components/activate/activate.component';
import {LoaderComponent} from './shared/loader/loader.component';

const routes: Routes = [
  {path: 'terms-conditions', component: TermsConditionsComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'activate', component: ActivateComponent},
  {path: 'loader', component: LoaderComponent},
  {path: '', component: MainComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
