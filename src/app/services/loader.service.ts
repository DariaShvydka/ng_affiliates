import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  $loaderStatus = new EventEmitter();

  constructor() { }

  start() {
    this.$loaderStatus.emit(true);
  }

  stop() {
    this.$loaderStatus.emit(false);
  }

}
