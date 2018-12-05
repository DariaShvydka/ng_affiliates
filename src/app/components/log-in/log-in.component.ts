import {Component, OnInit} from '@angular/core';
import {APIService} from '../../services/api.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ValidationService} from '../../services/validation.service';
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss', '../../common-styles/register.scss']
})
export class LogInComponent implements OnInit {

  loginData: FormGroup;

  usernameError: string;
  passwordError: string;

  constructor(private loader: LoaderService, private api: APIService, private formBuilder: FormBuilder,
              private validate: ValidationService) {
    this.loginData = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern(validate.usernamePattern)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(validate.passwordPattern)])],
    });
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    this.loader.start();
    this.api.login(formData.username, formData.password).subscribe((data) => {
      this.gotSuccess(data);
    }, error1 => {
      this.loader.stop();
      this.gotError(error1);
    });
  }

  gotSuccess(response) {
    if (response.success) {
      window.location.href = response.redirect_url;
    } else {
      this.loader.stop();
      if (response.error.username) {
        this.usernameError = response.error.username;
      }
      if (response.error.password) {
        this.passwordError = response.error.password;
      }
    }
  }

  gotError(error) {
    console.log(error);
  }
}
