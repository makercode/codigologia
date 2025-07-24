import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautybossComponent } from './beautyboss.component';

describe('BeautybossComponent', () => {
  let component: BeautybossComponent;
  let fixture: ComponentFixture<BeautybossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeautybossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeautybossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
