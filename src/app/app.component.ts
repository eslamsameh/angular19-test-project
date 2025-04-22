import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ToastModule } from 'primeng/toast';
import { authRehydrate } from '@/store';
import { constants } from '@/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'anboba-admin-pannel';
  private cookieService = inject(CookieService);
  private store = inject(Store);

  ngOnInit(): void {
    const accessToken = this.cookieService.get(constants.ACCESS_TOKEN);
    const refreshToken = this.cookieService.get(constants.REFRESH_TOKEN);
    const user = this.cookieService.get(constants.COOKIE_PROP_USER);

    if (accessToken && refreshToken && user) {
      this.store.dispatch(authRehydrate({ user, accessToken, refreshToken }));
    }
  }
}
