import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { InformacionGrupo } from './informacion-grupo';

describe('InformacionGrupo', () => {
  let component: InformacionGrupo;
  let fixture: ComponentFixture<InformacionGrupo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionGrupo],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(InformacionGrupo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
