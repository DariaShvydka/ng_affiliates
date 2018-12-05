import {Component, OnInit, ViewEncapsulation} from '@angular/core';

declare var $: any;
import 'owl.carousel';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss',
    '../../../../node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
    '../../../../node_modules/owl.carousel/dist/assets/owl.theme.default.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})

export class GalleryComponent implements OnInit {
  ngOnInit() {
    $(document).ready(function () {
      $('.owl-carousel').owlCarousel({
        center: true,
        items: 3,
        dots: false,
        nav: true,
        loop: true,
        autoplay: true,
        margin: 30,
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          600: {
            items: 2
          },
          1000: {
            items: 3
          }
        }
      });
    });
  }
}
