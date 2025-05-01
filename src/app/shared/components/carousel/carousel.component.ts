import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  ContentChild,
  input,
  signal,
  TemplateRef,
} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, NgTemplateOutlet],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  data = input.required<any[]>();
  contentTemplate = contentChild.required<TemplateRef<any>>('carouselItem');

  responsiveOptions = signal([
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ]);
}
