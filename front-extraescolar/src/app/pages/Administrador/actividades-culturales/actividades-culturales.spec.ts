import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadesCulturales } from './actividades-culturales';

describe('ActividadesCulturales', () => {
  let component: ActividadesCulturales;
  let fixture: ComponentFixture<ActividadesCulturales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesCulturales],
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadesCulturales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
