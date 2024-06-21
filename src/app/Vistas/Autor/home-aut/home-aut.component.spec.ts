import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAutComponent } from './home-aut.component';

describe('HomeAutComponent', () => {
  let component: HomeAutComponent;
  let fixture: ComponentFixture<HomeAutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
