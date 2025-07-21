import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigologiaComponent } from './codigologia.component';

describe('CodigologiaComponent', () => {
  let component: CodigologiaComponent;
  let fixture: ComponentFixture<CodigologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodigologiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodigologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
