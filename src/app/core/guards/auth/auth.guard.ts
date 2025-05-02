import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '@/store';
import { firstValueFrom } from 'rxjs';

export const authRedirectGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  const user = await firstValueFrom(store.select(selectUser));
  if (user?.id) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
