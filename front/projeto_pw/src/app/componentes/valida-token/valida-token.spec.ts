import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaToken } from './valida-token';

describe('ValidaToken', () => {
  let component: ValidaToken;
  let fixture: ComponentFixture<ValidaToken>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidaToken],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidaToken);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
