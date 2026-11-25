import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnoLayoutComponent } from './alumno-layout';

describe('AlumnoLayout', () => {
  let component: AlumnoLayoutComponent;
  let fixture: ComponentFixture<AlumnoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlumnoLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
