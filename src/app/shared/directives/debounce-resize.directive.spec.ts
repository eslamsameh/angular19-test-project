import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { DebounceResizeDirective } from './debounce-resize.directive';
import { Component, DebugElement, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [DebounceResizeDirective],
  template: `<div
    appDebounceResize
    #debounceResize="debounceResize"
    style="width: 100px"
  ></div>`,
})
class TestHostComponent implements OnDestroy {
  sub: Subscription | null = null;
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

class MockResizeObserver {
  observe = jasmine.createSpy();
  unobserve = jasmine.createSpy();
  disconnect = jasmine.createSpy();
  constructor(public callback: ResizeObserverCallback = () => {}) {}
}

describe('DebounceResizeDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostEl: DebugElement;
  let directiveInstance: DebounceResizeDirective;
  beforeEach(() => {
    (window as any).ResizeObserver = MockResizeObserver;
    TestBed.configureTestingModule({
      imports: [TestHostComponent, DebounceResizeDirective],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    hostEl = fixture.debugElement.query(By.directive(DebounceResizeDirective));
    directiveInstance = hostEl.injector.get(DebounceResizeDirective);
    fixture.detectChanges();
  });
  it('should create an instance', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it('should emit debounced width on resize', fakeAsync(() => {
    let result: number | null = null;

    // Subscribe to debounced width$
    const sub = directiveInstance.width$.subscribe((width) => {
      result = width;
    });

    // Simulate resize by changing offsetWidth
    const element = hostEl.nativeElement as HTMLElement;
    Object.defineProperty(element, 'offsetWidth', {
      value: 200,
      writable: true,
      configurable: true,
    });

    // Trigger observer callback manually
    (directiveInstance as any).resizeObserver['callback']();
    fixture.detectChanges();

    // Advance time less than debounce delay
    tick(100);
    expect(result).toBeNull();

    // Now advance past debounce
    tick(300);
    expect(result).toBe(200 as any);

    sub.unsubscribe();
  }));
});
