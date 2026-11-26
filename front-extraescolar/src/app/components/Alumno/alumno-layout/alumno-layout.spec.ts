import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AlumnoLayoutComponent } from './alumno-layout';

describe('AlumnoLayout', () => {
  let component: AlumnoLayoutComponent;
  let fixture: ComponentFixture<AlumnoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AlumnoLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
