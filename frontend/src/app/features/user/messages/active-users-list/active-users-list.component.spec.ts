import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUsersListComponent } from './active-users-list.component';

describe('ActiveUsersListComponent', () => {
  let component: ActiveUsersListComponent;
  let fixture: ComponentFixture<ActiveUsersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveUsersListComponent]
    });
    fixture = TestBed.createComponent(ActiveUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
