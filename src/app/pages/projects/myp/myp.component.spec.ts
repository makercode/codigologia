import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypComponent } from './myp.component';

describe('MypComponent', () => {
  let component: MypComponent;
  let fixture: ComponentFixture<MypComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MypComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MypComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
