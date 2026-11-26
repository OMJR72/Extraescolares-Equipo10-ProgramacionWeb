import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Bienvenido } from './bienvenido';

describe('Bienvenido', () => {
  let component: Bienvenido;
  let fixture: ComponentFixture<Bienvenido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bienvenido],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Bienvenido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
