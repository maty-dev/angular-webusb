import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerprintMorphoComponent } from './fingerprint-morpho.component';

describe('FingerprintMorphoComponent', () => {
  let component: FingerprintMorphoComponent;
  let fixture: ComponentFixture<FingerprintMorphoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FingerprintMorphoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FingerprintMorphoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
