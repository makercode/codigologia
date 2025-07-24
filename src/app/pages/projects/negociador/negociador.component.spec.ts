import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociadorComponent } from './negociador.component';

describe('NegociadorComponent', () => {
  let component: NegociadorComponent;
  let fixture: ComponentFixture<NegociadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NegociadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegociadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
