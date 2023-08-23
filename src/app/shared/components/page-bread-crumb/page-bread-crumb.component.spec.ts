import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBreadCrumbComponent } from './page-bread-crumb.component';

describe('PageBreadCrumbComponent', () => {
  let component: PageBreadCrumbComponent;
  let fixture: ComponentFixture<PageBreadCrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBreadCrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBreadCrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
