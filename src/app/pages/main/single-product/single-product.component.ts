import { AfterViewInit, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  imports: [],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss',
})
export class SingleProductComponent implements AfterViewInit {
  route = inject(ActivatedRoute);

  ngAfterViewInit() {
    const resolved = this.route.snapshot.data['productLoaded'];
    console.log('Resolved product loaded?', resolved);
  }
}
