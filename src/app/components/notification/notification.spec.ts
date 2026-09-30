import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notification123 } from './notification';

describe('Notification123', () => {
  let component: Notification123;
  let fixture: ComponentFixture<Notification123>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notification123],
    }).compileComponents();

    fixture = TestBed.createComponent(Notification123);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
