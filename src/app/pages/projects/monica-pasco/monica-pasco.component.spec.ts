import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonicaPascoComponent } from './monica-pasco.component';

describe('MonicaPascoComponent', () => {
  let component: MonicaPascoComponent;
  let fixture: ComponentFixture<MonicaPascoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonicaPascoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonicaPascoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
