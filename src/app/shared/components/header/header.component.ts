import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from '@/interface';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '@/store';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-header',

  imports: [
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RouterModule,
    OverlayPanelModule,
    MenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private store = inject(Store);
  readonly user = this.store.selectSignal(selectUser);
  items = signal<MenuItem[]>([
    {
      label: 'Home',
      icon: 'pi pi-home',
      badge: undefined,
      items: undefined,
      path: '/',
    },
    {
      label: 'Products',
      icon: 'pi pi-search',
      badge: undefined,
      path: '/products',
      items: [
        {
          label: 'Core',
          icon: 'pi pi-bolt',
          badge: undefined,
          items: undefined,
          path: '/products/core',
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',
          badge: undefined,
          items: undefined,
          path: '/products/blocks',
        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil',
          badge: undefined,
          items: undefined,
          path: '/products/kit',
        },
      ],
    },
  ]);
  userMenuItems = [
    { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() },
  ];

  logout() {}
}
