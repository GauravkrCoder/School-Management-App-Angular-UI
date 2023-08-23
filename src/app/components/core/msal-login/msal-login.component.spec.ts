import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsalLoginComponent } from './msal-login.component';

describe('MsalLoginComponent', () => {
  let component: MsalLoginComponent;
  let fixture: ComponentFixture<MsalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsalLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
