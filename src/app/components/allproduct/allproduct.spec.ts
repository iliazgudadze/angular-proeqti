import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allproduct } from './allproduct';

describe('Allproduct', () => {
  let component: Allproduct;
  let fixture: ComponentFixture<Allproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Allproduct],
    }).compileComponents();

    fixture = TestBed.createComponent(Allproduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
