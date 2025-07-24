import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranaComponent } from './guarana.component';

describe('GuaranaComponent', () => {
  let component: GuaranaComponent;
  let fixture: ComponentFixture<GuaranaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuaranaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuaranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
