 //import { TestBed, async } from '@angular/core/testing';
 import { AppComponent } from './app.component';
// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   }));
//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));
//   it(`should have as title 'AngularBootStrap'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('AngularBootStrap');
//   }));
//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Welcome to AngularBootStrap!');
//   }));
// });

describe('AppComponent', () => {
  it('#viewTask() should toggle #isAddTask', () => {
    const comp = new AppComponent();
    expect(comp.isAddTask).toBe(true, 'off at first');

    comp.viewTask();
    expect(comp.isAddTask).toBe(false, 'on after click');
    comp.addTask();
    expect(comp.isAddTask).toBe(true, 'off after second click');
  });

});
