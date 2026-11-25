import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadesDeportivas } from './actividades-deportivas';

describe('ActividadesDeportivas', () => {
  let component: ActividadesDeportivas;
  let fixture: ComponentFixture<ActividadesDeportivas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesDeportivas],
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadesDeportivas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
