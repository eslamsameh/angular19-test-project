import { ProductItem } from '@/interface';
import {
  loadProducts,
  selectProducts,
  selectProductsFailure,
  selectProductsLoading,
  selectProductsSuccess,
} from '@/store';
import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  imports: [Carousel, ButtonModule, Tag, ProgressSpinner],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  store = inject(Store);
  readonly productsLoading = this.store.selectSignal(selectProductsLoading);
  readonly productsError = this.store.selectSignal(selectProductsFailure);
  readonly products = this.store.selectSignal(selectProducts);
  responsiveOptions: any[] | undefined;

  constructor() {
    this.store.dispatch(loadProducts());
    this.responsiveOptions = [
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
    ];
  }

  public getSeverity(status: string) {
    switch (status.toUpperCase()) {
      case 'IN STOCK':
        return 'success';
      case 'LOW STOCK':
        return 'warn';
      case 'OUT OF STOCK':
        return 'danger';
      default:
        return 'danger';
    }
  }
}
