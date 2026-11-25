import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarUsuario } from './administrar-usuario';

describe('AdministrarUsuario', () => {
  let component: AdministrarUsuario;
  let fixture: ComponentFixture<AdministrarUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrarUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrarUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
