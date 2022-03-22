import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolListComponent } from './pol-list.component';

describe('PolListComponent', () => {
  let component: PolListComponent;
  let fixture: ComponentFixture<PolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
