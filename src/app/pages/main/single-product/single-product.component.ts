import { ProductItem } from '@/interface';
import { Component, inject, AfterViewInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  standalone: true,
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements AfterViewInit {
  private titleService = inject(Title);
  private route = inject(ActivatedRoute);
  product = signal<ProductItem | undefined>(undefined);
  ngAfterViewInit(): void {
    this.product.set(this.route.snapshot.data['productLoaded']);

    this.titleService.setTitle(
      `Product - ${this.product()?.title}` || 'Product Not Found'
    );
  }
}
