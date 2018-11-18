 // import { TestBed, async } from '@angular/core/testing';
 import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 import { TestBed } from '@angular/core/testing';
 import { AppComponent } from './app.component';
 import { TaskModel } from './TaskModel/addtask.model';

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

let expected = '';

beforeEach(() => {
  expected = 'hello test';
});

afterEach(() => {
  expected = '';
});

  it('#viewTask() should toggle #isAddTask', () => {
    const comp = new AppComponent();
    expect(comp.isAddTask).toBe(true, 'off at first');

    comp.viewTask();
    expect(comp.isAddTask).toBe(false, 'on after click');
    comp.addTask();
    expect(comp.isAddTask).toBe(true, 'off after second click');
  });

  it('Hello test', () => expect('hello test').toBe(expected));

});

describe('Add Task Methods', () => {

  let httpMock: HttpTestingController;
  let comp: AppComponent;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports : [HttpClientTestingModule],
          providers: [AppComponent]
      });
      comp = TestBed.get(AppComponent);
      httpMock = TestBed.get(HttpTestingController);
  });

  it('add component construction', () => {
    const tsk = new TaskModel();
    tsk.taskId = 1;
    tsk.taskName = 'Today Task test';
    tsk.parentTaskId = 1;
    tsk.parentTaskName = 'Parent Task Mapped Test';
    tsk. priority = 4;
    tsk.priorityTo = null;
    tsk.startDate = '2018-11-24 00:00:00.000';
    tsk.endDate = '2018-11-24 00:00:00.000';
    tsk.IsEnded = false;

    expect(comp.addTask());
    expect(comp.viewTask());
    expect(comp.editTaskItem(tsk));

  });
});
