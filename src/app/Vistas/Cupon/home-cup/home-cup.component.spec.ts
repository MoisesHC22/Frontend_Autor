import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCupComponent } from './home-cup.component';

describe('HomeCupComponent', () => {
  let component: HomeCupComponent;
  let fixture: ComponentFixture<HomeCupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeCupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
