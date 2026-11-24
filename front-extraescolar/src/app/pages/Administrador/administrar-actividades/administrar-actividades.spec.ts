import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarActividades } from './administrar-actividades';

describe('AdministrarActividades', () => {
  let component: AdministrarActividades;
  let fixture: ComponentFixture<AdministrarActividades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrarActividades],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrarActividades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
