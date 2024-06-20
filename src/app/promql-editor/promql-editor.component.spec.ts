import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromqlEditorComponent } from './promql-editor.component';

describe('PromqlEditorComponent', () => {
  let component: PromqlEditorComponent;
  let fixture: ComponentFixture<PromqlEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromqlEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromqlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
