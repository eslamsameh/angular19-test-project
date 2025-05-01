import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, provideRouter, RouterOutlet } from '@angular/router';
import { selectUser } from '@/store';
import { routes } from '@/app.routes';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent, RouterOutlet],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectUser, value: {} }],
        }),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
