import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageContentsListComponent } from './message-contents-list.component';

describe('MessageContentsListComponent', () => {
  let component: MessageContentsListComponent;
  let fixture: ComponentFixture<MessageContentsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageContentsListComponent]
    });
    fixture = TestBed.createComponent(MessageContentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
