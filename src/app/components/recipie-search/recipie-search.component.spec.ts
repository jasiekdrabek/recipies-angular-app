import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipieSearchComponent } from './recipie-search.component';

describe('RecipieSearchComponent', () => {
  let component: RecipieSearchComponent;
  let fixture: ComponentFixture<RecipieSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipieSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
