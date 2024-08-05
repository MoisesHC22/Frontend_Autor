import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfProductosComponent } from './inf-productos.component';

describe('InfProductosComponent', () => {
  let component: InfProductosComponent;
  let fixture: ComponentFixture<InfProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
