import {
  AfterViewInit,
  Component,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { map } from 'rxjs';
import { DebounceResizeDirective } from '@/shared/directives';
import { ProductItem } from '@/interface';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Image } from 'primeng/image';
import { RouterLink } from '@angular/router';

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
    Image,
    RouterLink,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements AfterViewInit {
  product = input.required<ProductItem>();
  resizeDirective = viewChild<DebounceResizeDirective>('cardRef');
  smallView = signal<boolean>(true);

  ngAfterViewInit() {
    this.resizeDirective()
      ?.width$.pipe(map((width) => width >= 600))
      .subscribe((visible) => this.smallView.set(!visible));
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
