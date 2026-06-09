import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrocaSenha } from './troca-senha';

describe('TrocaSenha', () => {
  let component: TrocaSenha;
  let fixture: ComponentFixture<TrocaSenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrocaSenha],
    }).compileComponents();

    fixture = TestBed.createComponent(TrocaSenha);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
