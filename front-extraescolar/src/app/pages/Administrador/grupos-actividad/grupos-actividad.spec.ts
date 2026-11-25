import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GruposActividad } from './grupos-actividad';

describe('GruposActividad', () => {
  let component: GruposActividad;
  let fixture: ComponentFixture<GruposActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposActividad],
    }).compileComponents();

    fixture = TestBed.createComponent(GruposActividad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
