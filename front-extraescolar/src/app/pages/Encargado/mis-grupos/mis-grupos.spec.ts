import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MisGrupos } from './mis-grupos';

describe('MisGrupos', () => {
  let component: MisGrupos;
  let fixture: ComponentFixture<MisGrupos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisGrupos],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MisGrupos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
