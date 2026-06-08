import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LehrerDetailComponent } from './lehrer-detail.component';

describe('LehrerDetailComponent', () => {
  let component: LehrerDetailComponent;
  let fixture: ComponentFixture<LehrerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LehrerDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LehrerDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
