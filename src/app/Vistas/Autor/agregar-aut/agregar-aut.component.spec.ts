import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAutComponent } from './agregar-aut.component';

describe('AgregarAutComponent', () => {
  let component: AgregarAutComponent;
  let fixture: ComponentFixture<AgregarAutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarAutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarAutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
