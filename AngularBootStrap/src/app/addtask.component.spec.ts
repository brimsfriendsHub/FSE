import { SharedServiceService } from './taskservice.service';
import { TaskModel } from './TaskModel/addtask.model';
import { TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './addtask.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('Add Task Service', () => {

let service: SharedServiceService;
let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports : [HttpClientTestingModule],
            providers: [SharedServiceService]
        });

        service = TestBed.get(SharedServiceService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('check service is available', () => {
        expect(service).toBeTruthy();
    });

    it('Add new Task', () => {
        // tslint:disable-next-line:prefer-const
        let tsk = new TaskModel();
        const expectedValue = true;
        tsk.taskId = 0;
        tsk.taskName = 'Today Task update';
        tsk.parentTaskId = 0;
        tsk.parentTaskName = 'Parent Task1';
        tsk. priority = 1;
        tsk.priorityTo = null;
        tsk.startDate = '2018-11-10 00:00:00.000';
        tsk.endDate = '2018-11-10 00:00:00.000';
        tsk.IsEnded = false;

        service.addTask(tsk).subscribe(data => {
            // expect(data).toBeNaN();
            // expect(data).toEqual(expectedValue);
        });

        const request =  httpMock.expectOne(service.taskManagerUrl + 'addTask');
        expect(request.request.method).toEqual('POST');
        // request.flush(expectedValue);
    });

    it('Update Task', () => {
        // tslint:disable-next-line:prefer-const
        let tsk = new TaskModel();
        const expectedValue = true;
        tsk.taskId = 0;
        tsk.taskName = 'Today Task update1';
        tsk.parentTaskId = 0;
        tsk.parentTaskName = 'Parent Task1';
        tsk. priority = 1;
        tsk.priorityTo = null;
        tsk.startDate = '2018-11-10 00:00:00.000';
        tsk.endDate = '2018-11-10 00:00:00.000';
        tsk.IsEnded = false;

        service.updateTask(tsk).subscribe(data => {
            // expect(data).toBeNaN();
            // expect(data).toEqual(expectedValue);
        });

        const request =  httpMock.expectOne(service.taskManagerUrl + 'updateTask');
        expect(request.request.method).toEqual('POST');
        // request.flush(expectedValue);
    });
});

describe('Add Task Methods', () => {
    let service: SharedServiceService;
    let httpMock: HttpTestingController;
    let comp: AddTaskComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports : [HttpClientTestingModule],
            providers: [SharedServiceService, DatePipe, FormBuilder, AddTaskComponent]
        });
        comp = TestBed.get(AddTaskComponent);
        service = TestBed.get(SharedServiceService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('add component construction', () => {
        expect(comp.taskId).toBe(0);
        expect(comp.priorityValue).toBe(0);
        expect(comp.pTaskName).toBe('No Parent Task Mapped');
        expect(comp.validationError).toBe('');
        comp.ngOnInit();
      });

    it('validate date func', () => {

        const tsk = new TaskModel();
        tsk.taskId = 0;
        tsk.taskName = 'Today Task update1';
        tsk.parentTaskId = 0;
        tsk.parentTaskName = 'Parent Task1';
        tsk. priority = 1;
        tsk.priorityTo = null;
        tsk.startDate = '2018-11-10 00:00:00.000';
        tsk.endDate = '2018-11-11 00:00:00.000';
        tsk.IsEnded = false;

        expect(comp.validationDt(tsk)).toBe('');
      });

      it('Update func assign value to control', () => {

        const tsk = new TaskModel();
        tsk.taskId = 1;
        tsk.taskName = 'Today Task update1';
        tsk.parentTaskId = 1;
        tsk.parentTaskName = 'No Parent Task Mapped';
        tsk. priority = 1;
        tsk.priorityTo = null;
        tsk.startDate = '2018-11-10 00:00:00.000';
        tsk.endDate = '2018-11-11 00:00:00.000';
        tsk.IsEnded = false;

        expect(comp.assignTaskValue(tsk));
      });

      it('Add New Task', () => {

        const tsk = new TaskModel();
        tsk.taskId = 0;
        tsk.taskName = 'Today Task test';
        tsk.parentTaskId = 0;
        tsk.parentTaskName = 'Parent Task Mapped Test';
        tsk. priority = 4;
        tsk.priorityTo = null;
        tsk.startDate = '2018-11-24 00:00:00.000';
        tsk.endDate = '2018-11-24 00:00:00.000';
        tsk.IsEnded = false;

        expect(comp.onSubmit());
      });

      it('Add New Task assign values', () => {

        const tsk = new TaskModel();
        tsk.taskId = 0;
        tsk.taskName = 'Today Task test';
        tsk.parentTaskId = 0;
        tsk.parentTaskName = 'Parent Task Mapped Test';
        tsk. priority = 4;
        tsk.priorityTo = null;
        tsk.startDate = '2018-11-24 00:00:00.000';
        tsk.endDate = '2018-11-24 00:00:00.000';
        tsk.IsEnded = false;

        expect(comp.assignTaskValues(tsk));
      });
});


