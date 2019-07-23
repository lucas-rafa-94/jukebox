import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JukeboxHomeComponent } from './jukebox-home.component';

describe('JukeboxHomeComponent', () => {
  let component: JukeboxHomeComponent;
  let fixture: ComponentFixture<JukeboxHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JukeboxHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JukeboxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
