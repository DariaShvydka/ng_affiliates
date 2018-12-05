import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed = 1;

  active = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.$loaderStatus.subscribe((loaderStatus) => {
      if (this.active === true && loaderStatus === false) {
        setTimeout(() => {
          this.active = loaderStatus;
        }, 1000);
      } else {
        this.active = loaderStatus;
      }
    });
    this.lottieConfig = {
      path: 'assets/animations/loader.json',
      autoplay: true,
      loop: true,
      speed: 5
    };
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }

  ngOnInit() {

  }

}
