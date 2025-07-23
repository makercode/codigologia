import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyrComponent } from './cyr.component';

describe('CyrComponent', () => {
  let component: CyrComponent;
  let fixture: ComponentFixture<CyrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
