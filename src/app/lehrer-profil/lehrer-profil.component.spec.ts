import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LehrerProfilComponent } from './lehrer-profil.component';

describe('LehrerProfilComponent', () => {
  let component: LehrerProfilComponent;
  let fixture: ComponentFixture<LehrerProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LehrerProfilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LehrerProfilComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
