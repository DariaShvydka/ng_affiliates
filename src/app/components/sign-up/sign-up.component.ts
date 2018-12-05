import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {countries} from '../../data/countries';
import {ValidationService} from '../../services/validation.service';
import {APIService} from '../../services/api.service';
import {UserService} from '../../services/user.service';
import {LoaderService} from '../../services/loader.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../../common-styles/register.scss']
})

export class SignUpComponent implements OnInit {
  captchaUrl = environment.pm_api_base_url + '/en/partner/captcha/?t=1533060534';

  isSignupComplete = false;
  regData: FormGroup;

  availableCurrencies = [
    {name: 'Euro', value: 'EUR'},
    {name: 'US Dollar', value: 'USD'},
    {name: 'Pound Sterling', value: 'GBP'},
  ];

  availableCountries = countries;
  error_messages: any = {};

  constructor(private router: Router, private loader: LoaderService, private formBuilder: FormBuilder, private validate: ValidationService,
              private api: APIService, private user: UserService) {
    this.regData = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.pattern(validate.usernamePattern)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(validate.emailPattern)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(validate.passwordPattern)])),
      passwordConfirm: new FormControl('', Validators.compose([Validators.required, validate.passwordConfirm])),
      site: new FormControl('', Validators.required),
      currency: new FormControl(this.availableCurrencies[0].value, Validators.required),
      country: new FormControl(countries[0].code, Validators.required),
      captcha: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)]))
    }, {updateOn: 'blur'});


  }

  ngOnInit() {
  }

  onSubmit(formData) {
    // Mark all fields as touched after submit tapped to trigger validation errors:
    for (const key in this.regData.controls) {
      if (this.regData.controls.hasOwnProperty(key)) {
        this.regData.controls[key].markAsTouched();
      }
    }
    // Abort submission if the form is invalid:
    if (!this.regData.valid) {
      return;
    }
    // Proceed with submission:
    this.loader.start();
    this.api.acc_register(formData.username, formData.password, formData.site, formData.currency,
      formData.email, formData.country, formData.captcha).subscribe((response) => {
      // In case of response:
      this.gotResponse(response);
      this.loader.stop();
    }, error1 => {
      // In case of error:
      console.log(error1);
      this.loader.stop();
    });
  }

  gotResponse(response) {
    console.log(response);
    if (response.success === true) {
      this.registrationSuccess();
    } else if (response.success === false) {
      const error_dict = response.error;
      this.error_messages = error_dict;
      for (const key in error_dict) {
        if (error_dict.hasOwnProperty(key)) {
          const value = error_dict[key];
          console.log(key + ': ' + value);
          this.regData.controls[key].setErrors({'em_error': true});
          this.regData.controls[key].markAsTouched();
        }
      }
    }
  }

  registrationSuccess() {
    this.isSignupComplete = true;
    window.scrollTo(0,0);
    // make it scroll to top = 0, need to check in safari
  }

  reloadCaptcha() {
    const captcha = document.getElementById('captcha-img');
    const captchaUrl = captcha.getAttribute('src');
    captcha.setAttribute('src', '');
    captcha.setAttribute('src', captchaUrl + '?');
  }

  moveToActivation() {
    this.router.navigate(['/activate']).then();
  }
}
