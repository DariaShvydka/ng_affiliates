import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {fadeAnimation} from '../../animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeAnimation]
})

 export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
          }
        }
      }
    });

    // mobile burger-menu
    function mobileMenu() {
      const mobBody = document.body;
      const mobBurgerMenu = document.getElementsByClassName('mob-burger__icon')[0];
      const mobLinks = document.getElementsByClassName('mob-link');
      const linksArray = Array.prototype.slice.call(mobLinks);
      const mobBurgerContain = document.getElementsByClassName('mob-burger__container')[0];
      const mobBurgerNav = document.getElementsByClassName('mob-navigation')[0];

      mobBurgerMenu.addEventListener('click', function toggleClasses() {
        [mobBody, mobBurgerContain, mobBurgerNav].forEach(function (el) {
          el.classList.toggle('mob-open');
        });
      }, false);

      linksArray.forEach(function (element) {
        element.addEventListener('click', function toggleClasses() {
          [mobBody, mobBurgerContain, mobBurgerNav].forEach(function (el) {
            el.classList.toggle('mob-open');
          });
        }, false);
      });
    }

    mobileMenu();
  }
 }
