import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProdComponent } from './lista-prod.component';

describe('ListaProdComponent', () => {
  let component: ListaProdComponent;
  let fixture: ComponentFixture<ListaProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
