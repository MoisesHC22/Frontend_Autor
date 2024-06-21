import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLibComponent } from './home-lib.component';

describe('HomeLibComponent', () => {
  let component: HomeLibComponent;
  let fixture: ComponentFixture<HomeLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLibComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
