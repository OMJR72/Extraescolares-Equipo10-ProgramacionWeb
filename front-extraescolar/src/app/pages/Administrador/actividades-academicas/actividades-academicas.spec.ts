import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadesAcademicas } from './actividades-academicas';

describe('ActividadesAcademicas', () => {
  let component: ActividadesAcademicas;
  let fixture: ComponentFixture<ActividadesAcademicas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesAcademicas],
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadesAcademicas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
