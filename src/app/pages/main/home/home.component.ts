import { ProductItem } from '@/interface';
import {
  loadProducts,
  selectProducts,
  selectProductsFailure,
  selectProductsLoading,
} from '@/store';
import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { ProgressSpinner } from 'primeng/progressspinner';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Carousel, ButtonModule, Tag, ProgressSpinner, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  store = inject(Store);
  readonly productsLoading = this.store.selectSignal(selectProductsLoading);
  readonly productsError = this.store.selectSignal(selectProductsFailure);
  readonly products = this.store.selectSignal(selectProducts);
  responsiveOptions = signal<
    {
      breakpoint: string;
      numVisible: number;
      numScroll: number;
    }[]
  >([]);

  constructor() {
    this.store.dispatch(loadProducts());
    this.responsiveOptions.set([
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

  getSeverity(status: string) {
    switch (status.toUpperCase()) {
      case 'IN STOCK':
        return 'info';
      case 'LOW STOCK':
        return 'warn';
      case 'OUT OF STOCK':
        return 'danger';
      default:
        return 'danger';
    }
  }
  getImage(product: ProductItem) {
    product.images.find((v) => v === product.thumbnail);
  }
}
