import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YaquaComponent } from './yaqua.component';

describe('YaquaComponent', () => {
  let component: YaquaComponent;
  let fixture: ComponentFixture<YaquaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YaquaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YaquaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
