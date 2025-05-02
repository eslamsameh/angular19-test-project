import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

export function withCachedRequest<T>(
  getAllSelector$: Observable<T[] | null>,
  match: (item: T) => boolean,
  loadAction: () => void,
  getSingleSelector$: Observable<T | null>
): Observable<T> {
  return getAllSelector$.pipe(
    take(1),
    switchMap((items) => {
      if (Array.isArray(items)) {
        const matchItem = items.find(match);
        if (matchItem) return of(matchItem);
      }

      // Dispatch action to load the item
      loadAction();

      // Wait until the correct item appears in the single-item selector
      return getSingleSelector$.pipe(
        filter((item): item is T => !!item && match(item)),
        take(1)
      );
    })
  );
}
