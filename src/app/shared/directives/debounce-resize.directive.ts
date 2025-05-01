import {
  computed,
  Directive,
  ElementRef,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
  pipe,
} from 'rxjs';

import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appDebounceResize]',
  exportAs: 'debounceResize',
})
export class DebounceResizeDirective {
  private host = inject(ElementRef<HTMLElement>);
  private resizeObserver: ResizeObserver;
  private destroy$ = new Subscription();
  // Internal signal for raw width
  private widthSignal = signal<number>(0);
  // Public debounced observable
  readonly width$: Observable<number>;

  constructor() {
    const element = this.host.nativeElement;

    // Observe element width
    this.resizeObserver = new ResizeObserver(() => {
      this.widthSignal.set(element.offsetWidth);
    });
    this.resizeObserver.observe(element);

    // Debounced width observable
    this.width$ = toObservable(this.widthSignal).pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
    this.destroy$.unsubscribe();
  }
}
