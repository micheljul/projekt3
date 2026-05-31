import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchuelerProfilComponent } from './schueler-profil.component';

describe('SchuelerProfilComponent', () => {
  let component: SchuelerProfilComponent;
  let fixture: ComponentFixture<SchuelerProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchuelerProfilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchuelerProfilComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
