import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  API_URL = environment.pm_api_base_url + '/api/js/';

  constructor(private httpClient: HttpClient) {

  }

  api_post_request(endpoint, payload, requestOptions = {}) {
    const call_url = this.API_URL + endpoint;
    console.log('REQUEST TO ' + endpoint.toUpperCase() + ' PAYLOAD:');
    console.log(payload);
    return this.httpClient.post(call_url, payload, requestOptions);
  }

  acc_register(username: string, password: string, site: string, currency: string, email: string, country: string, captcha: string) {
    const endpoint = 'register';
    const payload = {
      username: username,
      password: password,
      site: site,
      currency: currency,
      captcha: captcha,
      country: country,
      email: email
    };
    const options = {
      withCredentials: true
    };
    return this.api_post_request(endpoint, payload, options);
  }

  acc_verify(activation_code: string) {
    const endpoint = 'verify';
    const payload = {activation_code: activation_code};
    return this.api_post_request(endpoint, payload);
  }

  acc_reset_pass_step1(username: string, email: string) {
    const endpoint = 'forgotpassword';
    const payload = {username: '', email: ''};
    return this.api_post_request(endpoint, payload);
  }

  acc_reset_pass_step2(password: string) {
    const endpoint = 'resetpassword';
    const payload = {password: password};
    return this.api_post_request(endpoint, payload);
  }

  login(username, password) {
    const endpoint = 'login';
    const payload = {username: username, password: password};
    return this.api_post_request(endpoint, payload);
  }
}
