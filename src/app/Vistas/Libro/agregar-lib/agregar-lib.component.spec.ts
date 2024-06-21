import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLibComponent } from './agregar-lib.component';

describe('AgregarLibComponent', () => {
  let component: AgregarLibComponent;
  let fixture: ComponentFixture<AgregarLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarLibComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
