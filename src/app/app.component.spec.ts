import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { constants } from './config';
import { authRehydrate } from './store';
import { UserProps } from './interface';

const refreshToken = 'refresh-token';
const accessToken = 'accessToken';
const user: UserProps = {
  id: undefined,
  accessToken: '',
  email: 'asd@asd.com',
  firstName: 'user1',
  lastName: 'last1',
  gender: 'mail',
  image: '',
  refreshToken: '',
  username: 'asd',
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let cookieService: CookieService;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore(),
        provideHttpClientTesting(),
        MessageService,
        CookieService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch authRehydrate if there is tokens and user in cookies', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    // Set cookies before ngOnInit is called
    cookieService.set(constants.ACCESS_TOKEN, accessToken);
    cookieService.set(constants.COOKIE_PROP_USER, JSON.stringify(user));
    cookieService.set(constants.REFRESH_TOKEN, refreshToken);

    // Trigger ngOnInit
    component.ngOnInit();

    // Verify the dispatch was called with the correct action
    expect(dispatchSpy).toHaveBeenCalledWith(
      authRehydrate({
        user: JSON.stringify(user),
        accessToken,
        refreshToken,
      })
    );
  });

  it('should NOT dispatch authRehydrate if cookies are missing', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    // Clear all cookies
    cookieService.delete(constants.ACCESS_TOKEN);
    cookieService.delete(constants.COOKIE_PROP_USER);
    cookieService.delete(constants.REFRESH_TOKEN);

    // Trigger ngOnInit
    component.ngOnInit();

    // Verify dispatch was NOT called
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
