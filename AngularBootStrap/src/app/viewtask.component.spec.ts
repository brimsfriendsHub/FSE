import { SharedServiceService } from './taskservice.service';
import { TaskModel } from './TaskModel/addtask.model';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViewTaskComponent } from './viewtask.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

describe('View Task Service', () => {

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

        it('check retrived data is matched', () => {
            // tslint:disable-next-line:prefer-const
            let tsk = new TaskModel();
            const expectedValue: TaskModel[] = [{
                taskId : 1,
                taskName: 'Today Task update',
                parentTaskId : 1,
                parentTaskName: 'No Parent Task Mapped',
                priority: 1,
                priorityTo: 0,
                startDate: '2018-11-06 00:00:00.000',
                endDate: '2018-11-06 00:00:00.000',
                IsEnded: false
            }];

            service.getTask(tsk).subscribe(data => {
                expect(data.length).toBe(1);
                // expect(data).toEqual(expectedValue);
            });

            const request =  httpMock.expectOne(service.taskManagerUrl + 'viewTask');
            expect(request.request.method).toEqual('POST');
            request.flush(expectedValue);
        });

        it('End Task', () => {
            const taskId = 1;

            service.deleteTask(taskId).subscribe(data => {
                // expect(data.length).toBe(1);
                // expect(data).toEqual(expectedValue);
            });

            const request =  httpMock.expectOne(service.taskManagerUrl + 'endTask?taskId=' + taskId);
            expect(request.request.method).toEqual('GET');
            request.flush(taskId);
        });
});
describe('Add Task Methods', () => {
    let service: SharedServiceService;
    let httpMock: HttpTestingController;
    let comp: ViewTaskComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports : [HttpClientTestingModule],
            providers: [SharedServiceService, ViewTaskComponent, DatePipe, FormBuilder]
        });
        comp = TestBed.get(ViewTaskComponent);
        service = TestBed.get(SharedServiceService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('add component construction', () => {
        const tsk = new TaskModel();
        expect(comp.validationMessage).toBe('');
        expect(comp.ngOnInit());
        expect(comp.loadTaskDetails(tsk));
      });

      it('validate on  search task', () => {
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
        expect(comp.validateFields(tsk));
        expect(comp.filterResult(tsk));
      });

      it('add New form controls', () => {
        expect(comp.addTaskForm());
      });

      it('Search Click event', () => {
        expect(comp.onSubmit());
      });

      it('Edit task', () => {
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
        expect(comp.editTask.emit(tsk));
        expect(comp.editSingleTask(tsk));
      });

      it('search task', () => {
        expect(comp.onSubmit());
      });

      it('End task', () => {
          const taskId = 1;
        expect(comp.endSingleTask(taskId));
      });
      it('track task items', () => {
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
        expect(comp.trackTask(0, tsk.taskId));
    });
    });
