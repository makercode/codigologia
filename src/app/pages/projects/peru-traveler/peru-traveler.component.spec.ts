import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeruTravelerComponent } from './peru-traveler.component';

describe('PeruTravelerComponent', () => {
  let component: PeruTravelerComponent;
  let fixture: ComponentFixture<PeruTravelerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeruTravelerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeruTravelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
