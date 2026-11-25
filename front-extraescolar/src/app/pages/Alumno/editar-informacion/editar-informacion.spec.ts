import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarInformacion } from './editar-informacion';

describe('EditarInformacion', () => {
  let component: EditarInformacion;
  let fixture: ComponentFixture<EditarInformacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarInformacion],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarInformacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
