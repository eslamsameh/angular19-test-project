import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from '@/interface';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '@/store';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-header',
  imports: [
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RouterModule,
    PopoverModule,
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

  logout() {}
}
