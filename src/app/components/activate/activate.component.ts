import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../services/loader.service';
import {APIService} from '../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss', '../../common-styles/register.scss']
})
export class ActivateComponent implements OnInit {

  actData: FormGroup;
  isActivated = false;


  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
              private loader: LoaderService, private api: APIService) {
    this.actData = formBuilder.group({
      code: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.code) {
        this.gotCode(params.code);
      }
    });
  }

  gotCode(code) {
    this.loader.start();
    this.actData.controls.code.setValue(code);
    this.api.acc_verify(code).subscribe((response) => {
      this.gotActivationResponse(response);
      this.loader.stop();
    }, error1 => {
      this.gotActivationError(error1);
      this.loader.stop();
    });
  }

  onSubmit(form) {
    this.gotCode(form.code);
  }

  gotActivationResponse(response) {
    if (response.success === true) {
      this.isActivated = true;
    } else {
      console.log(response);
      this.actData.controls['code'].setErrors({'em_error': true});
      this.actData.controls['code'].markAsTouched();
    }
  }

  gotActivationError(error) {
    console.log(error);
  }

  goToLogin() {
    this.router.navigate(['/log-in']);
  }
}
