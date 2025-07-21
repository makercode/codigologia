import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WooStarsoftComponent } from './woo-starsoft.component';

describe('WooStarsoftComponent', () => {
  let component: WooStarsoftComponent;
  let fixture: ComponentFixture<WooStarsoftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WooStarsoftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WooStarsoftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
