import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoGrupo } from './info-grupo';

describe('InfoGrupo', () => {
  let component: InfoGrupo;
  let fixture: ComponentFixture<InfoGrupo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoGrupo],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoGrupo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
