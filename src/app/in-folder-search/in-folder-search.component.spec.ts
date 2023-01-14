import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InFolderSearchComponent } from './in-folder-search.component';

describe('InFolderSearchComponent', () => {
  let component: InFolderSearchComponent;
  let fixture: ComponentFixture<InFolderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InFolderSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InFolderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
