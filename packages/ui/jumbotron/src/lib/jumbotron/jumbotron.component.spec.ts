import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JumbotronComponent } from './jumbotron.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<lib-jumbotron>trasd</lib-jumbotron>`,
  imports: [JumbotronComponent],
  selector: 'lib-acncu',
})
export class TestJumbotronComponent {}

describe('TestJumbotron', () => {
  let component: TestJumbotronComponent;
  let fixture: ComponentFixture<TestJumbotronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestJumbotronComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestJumbotronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have rendered the text', () => {
    // Get the lib-jumbotron element itself
    const jumbotronElement = fixture.debugElement.query(
      By.css('lib-jumbotron')
    ).nativeElement;

    // Check that it renders the content
    expect(jumbotronElement.textContent).toContain('trasd');
  });
});
