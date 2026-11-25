import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioEncargado } from './inicio-encargado';

describe('InicioEncargado', () => {
  let component: InicioEncargado;
  let fixture: ComponentFixture<InicioEncargado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioEncargado],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioEncargado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
