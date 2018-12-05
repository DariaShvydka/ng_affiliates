import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/internal/operators';
import {fadeAnimation} from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      if (!this.activatedRoute.snapshot.fragment) { // In case there is no fragment (anchor) in URL => scroll to top
        document.body.scrollTo(0, 0);
      } else { // In case there is fragment => scroll to it:
        const element = document.querySelector('#' + this.activatedRoute.snapshot.fragment);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
          }, 50);
        }
      }
    });
  }
}
