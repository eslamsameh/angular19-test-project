import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { routes } from '@/app.routes';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterModule.forRoot(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to register page when Register link is clicked', () => {
    const registerLink = fixture.debugElement.nativeElement.querySelector('a');
    expect(registerLink).toBeTruthy();

    registerLink.click();
    const href = registerLink.getAttribute('href');

    expect(href).toBe('/auth/login');
  });
});
