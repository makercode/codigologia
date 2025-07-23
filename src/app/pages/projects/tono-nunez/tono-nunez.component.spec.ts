import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TonoNunezComponent } from './tono-nunez.component';

describe('TonoNunezComponent', () => {
  let component: TonoNunezComponent;
  let fixture: ComponentFixture<TonoNunezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TonoNunezComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TonoNunezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
