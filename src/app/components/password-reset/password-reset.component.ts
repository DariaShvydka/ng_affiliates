import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APIService} from '../../services/api.service';
import {ValidationService} from '../../services/validation.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss', '../../common-styles/register.scss']
})
export class PasswordResetComponent implements OnInit {

  isFirstStep = true;

  resetData: FormGroup;
  setData: FormGroup;

  constructor(private api: APIService, private formBuilder: FormBuilder, private validate: ValidationService) {
    this.resetData = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern(validate.usernamePattern)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(validate.emailPattern)])],
    });

    this.setData = formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.pattern(validate.passwordPattern)])],
      passwordConfirm: ['', Validators.compose([Validators.required, Validators.pattern(validate.passwordPattern)])],
    }, {
      validator: validate.passwordConfirm
    });
  }

  ngOnInit() {
  }

  onSubmitReset(formValue) {
    this.isFirstStep = !this.isFirstStep;
    console.log(formValue);
  }
  // Step2
  onSubmitSet(formValue) {
    console.log(formValue);
  }

}
