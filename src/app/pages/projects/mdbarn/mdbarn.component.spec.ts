import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdbarnComponent } from './mdbarn.component';

describe('MdbarnComponent', () => {
  let component: MdbarnComponent;
  let fixture: ComponentFixture<MdbarnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdbarnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdbarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
