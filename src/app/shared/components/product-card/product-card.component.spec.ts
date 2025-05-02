import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { DebounceResizeDirective } from '@/shared/directives/resize/debounce-resize.directive';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent, DebounceResizeDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.product = signal({
      title: 'Test Product',
      description: 'Test description',
      thumbnail: 'test-thumbnail.jpg',
      availabilityStatus: 'In Stock',
      category: 'Test Category',
      brand: 'Test Brand',
      rating: 4,
      price: 99.99,
    }) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with smallView set to true', () => {
    expect(component.smallView()).toBeTrue();
  });

  it('should get correct severity for "IN STOCK" status', () => {
    expect(component.getSeverity('IN STOCK')).toBe('info');
  });

  it('should get correct severity for "LOW STOCK" status', () => {
    expect(component.getSeverity('LOW STOCK')).toBe('warn');
  });

  it('should get correct severity for "OUT OF STOCK" status', () => {
    expect(component.getSeverity('OUT OF STOCK')).toBe('danger');
  });

  it('should get correct severity for "Another VAL" status', () => {
    expect(component.getSeverity('Another VAL')).toBe('danger');
  });

  it('should display the product title in the template', () => {
    const titleElement = fixture.debugElement.query(
      By.css('.font-medium')
    ).nativeElement;
    expect(titleElement.textContent).toBe('Test Product');
  });
});
