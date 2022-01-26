import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretsharingcommunicationComponent } from './secretsharingcommunication.component';

describe('SecretsharingcommunicationComponent', () => {
  let component: SecretsharingcommunicationComponent;
  let fixture: ComponentFixture<SecretsharingcommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretsharingcommunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretsharingcommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
