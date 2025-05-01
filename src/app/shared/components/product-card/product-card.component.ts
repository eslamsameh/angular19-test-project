import {
  AfterViewInit,
  Component,
  ViewChild,
  input,
  signal,
  computed,
} from '@angular/core';
import { map } from 'rxjs';
import { DebounceResizeDirective } from '@/shared/directives/debounce-resize.directive';
import { ProductItem } from '@/interface';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    Tag,
    ButtonModule,
    CurrencyPipe,
    DebounceResizeDirective,
    Rating,
    FormsModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements AfterViewInit {
  product = input.required<ProductItem>();

  @ViewChild('cardRef', { static: true })
  resizeDirective!: DebounceResizeDirective;

  smallView = signal<boolean>(false); // Use signal or observable depending on need

  ngAfterViewInit() {
    this.resizeDirective.width$
      .pipe(map((width) => width >= 600))
      .subscribe((visible) => this.smallView.set(visible));
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
}
