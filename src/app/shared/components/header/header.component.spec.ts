import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RouterModule } from '@angular/router';
import { routes } from '@/app.routes';
import { provideStore } from '@ngrx/store';
import { selectUser } from '@/store';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const initialState = {
  firstName: 'John',
  lastName: 'Doe',
  image: 'https://example.com/avatar.jpg',
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MenubarModule,
        OverlayPanelModule,
        RouterModule.forRoot(routes),
      ],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectUser, value: initialState }],
        }),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render menubar with correct items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const menuItems = compiled.querySelectorAll(
      '.p-menubar .p-menubar-root-list > li'
    );
    expect(menuItems.length).toBeGreaterThan(0);
    expect(menuItems[0].textContent).toContain('Home');
    expect(menuItems[1].textContent).toContain('Products');
  });

  it('should show user avatar if user is present', () => {
    const avatar = fixture.debugElement.query(By.css('p-avatar'));
    expect(avatar).toBeTruthy();
  });

  it('should call logout when logout link is clicked', () => {
    fixture.detectChanges();
    const logoutSpy = spyOn(component, 'logout').and.callThrough();
    const avatar = fixture.debugElement.query(By.css('p-avatar'));
    avatar.nativeElement.click();
    fixture.detectChanges();

    const logoutEl = fixture.debugElement.query(By.css('.dropdown-item.mt-3'));
    expect(logoutEl).toBeTruthy();

    logoutEl.nativeElement.click();
    expect(logoutSpy).toHaveBeenCalled();
  });
});
