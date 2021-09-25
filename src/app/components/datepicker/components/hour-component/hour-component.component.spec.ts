import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourComponentComponent } from './hour-component.component';

describe('HourComponentComponent', () => {
  let component: HourComponentComponent;
  let fixture: ComponentFixture<HourComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
