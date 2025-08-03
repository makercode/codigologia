import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

describe('AppComponent', () => {

  let routeSubscriptions: Subscription[] = [];

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatSidenavModule
      ],
      providers: [
        // Solución para Angular 19 - provee el router mínimo
        provideRouter([]),
        
        // Mock de ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map(),
              queryParamMap: new Map(),
              data: {},
              url: []
            },
            paramMap: {
              subscribe: (fn: (value: any) => void) => {
                const sub = new Subscription();
                routeSubscriptions.push(sub);
                return sub;
              }
            },
            queryParamMap: {
              subscribe: (fn: (value: any) => void) => {
                const sub = new Subscription();
                routeSubscriptions.push(sub);
                return sub;
              }
            },
            data: {
              subscribe: (fn: (value: any) => void) => {
                const sub = new Subscription();
                routeSubscriptions.push(sub);
                return sub;
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    // Limpia todas las suscripciones después de cada prueba
    routeSubscriptions.forEach(sub => sub.unsubscribe());
    routeSubscriptions = [];
  });

  it('should create the app', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    tick(); // Espera a que se completen las operaciones asíncronas
    
    expect(app).toBeTruthy();
    
    // Destruye explícitamente el fixture
    fixture.destroy();
  }));

  it('should have sidenav element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const sidenav = fixture.debugElement.query(By.css('mat-drawer'));
    expect(sidenav).toBeTruthy();
  });

  it('should toggle sidenav when header emits event', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    spyOn(app.sidenav, 'toggle');
    app.onHeaderValueChanged(true);
    
    expect(app.sidenav.toggle).toHaveBeenCalled();
    expect(app.isMenuOpen).toBeTrue();
  });
});
