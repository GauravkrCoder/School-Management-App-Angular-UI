import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericApiMessageComponent } from './generic-api-message.component';

describe('GenericApiMessageComponent', () => {
  let component: GenericApiMessageComponent;
  let fixture: ComponentFixture<GenericApiMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericApiMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericApiMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
