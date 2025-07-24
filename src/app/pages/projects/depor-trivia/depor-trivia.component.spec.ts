import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeporTriviaComponent } from './depor-trivia.component';

describe('DeporTriviaComponent', () => {
  let component: DeporTriviaComponent;
  let fixture: ComponentFixture<DeporTriviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeporTriviaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeporTriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
