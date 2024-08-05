import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoDeCompraComponent } from './carrito-de-compra.component';

describe('CarritoDeCompraComponent', () => {
  let component: CarritoDeCompraComponent;
  let fixture: ComponentFixture<CarritoDeCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoDeCompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarritoDeCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
