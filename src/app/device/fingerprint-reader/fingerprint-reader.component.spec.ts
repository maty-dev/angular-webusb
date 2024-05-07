import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigerprintReaderComponent } from './fingerprint-reader.component';

describe('FigerprintReaderComponent', () => {
  let component: FigerprintReaderComponent;
  let fixture: ComponentFixture<FigerprintReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigerprintReaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FigerprintReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
