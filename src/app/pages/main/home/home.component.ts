import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressSpinner } from 'primeng/progressspinner';
import { CarouselComponent, ProductCardComponent } from '@/shared/components';
import {
  loadProducts,
  selectProducts,
  selectProductsFailure,
  selectProductsLoading,
} from '@/store';

@Component({
  selector: 'app-home',
  imports: [ProgressSpinner, CarouselComponent, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  store = inject(Store);
  readonly productsLoading = this.store.selectSignal(selectProductsLoading);
  readonly productsError = this.store.selectSignal(selectProductsFailure);
  readonly products = this.store.selectSignal(selectProducts);

  constructor() {
    this.store.dispatch(loadProducts());
  }
}
