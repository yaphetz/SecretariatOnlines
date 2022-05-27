import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionsHistoryComponent } from './submissions-history.component';

describe('SubmissionsHistoryComponent', () => {
  let component: SubmissionsHistoryComponent;
  let fixture: ComponentFixture<SubmissionsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
