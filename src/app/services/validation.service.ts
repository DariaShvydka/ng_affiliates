import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  usernamePattern = '[a-zA-Z0-9-_.]{4,20}$';
  emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])$';
  passwordPattern = '(.){6,50}$';

  constructor() {
  }

  passwordConfirm(c: AbstractControl) {
    const confirmField = c.root.get('passwordConfirm');
    const passField = c.root.get('password');
    if (passField && confirmField && passField.value && confirmField.value) {
      const subs = passField.valueChanges.subscribe(() => {
        confirmField.updateValueAndValidity();
        subs.unsubscribe();
      });
    }
    if (confirmField && passField && confirmField.value !== passField.value) {
      return {passwordsMissmatch: true};
    }
  }
}
