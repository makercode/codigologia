import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManoalzadaComponent } from './manoalzada.component';

describe('ManoalzadaComponent', () => {
  let component: ManoalzadaComponent;
  let fixture: ComponentFixture<ManoalzadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManoalzadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManoalzadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
