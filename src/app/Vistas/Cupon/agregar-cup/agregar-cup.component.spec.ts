import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCupComponent } from './agregar-cup.component';

describe('AgregarCupComponent', () => {
  let component: AgregarCupComponent;
  let fixture: ComponentFixture<AgregarCupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarCupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarCupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
