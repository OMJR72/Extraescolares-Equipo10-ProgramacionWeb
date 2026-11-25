import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarFoto } from './editar-foto';

describe('EditarFoto', () => {
  let component: EditarFoto;
  let fixture: ComponentFixture<EditarFoto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFoto],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarFoto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
