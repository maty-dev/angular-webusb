import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermalPrinterPlugComponent } from './thermal-printer-plug.component';

describe('ThermalPrinterPlugComponent', () => {
  let component: ThermalPrinterPlugComponent;
  let fixture: ComponentFixture<ThermalPrinterPlugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThermalPrinterPlugComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThermalPrinterPlugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
